const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const cohereService = require('./cohere-service');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API: AI Chat
app.post('/api/ai-chat', async (req, res) => {
    try {
        const { history, message, currentResume } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await cohereService.chat(history || [], message, currentResume || {});
        res.json(response);

    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(500).json({ error: 'Failed to process chat request' });
    }
});

// API: Export to DOCX
app.post('/api/export-docx', async (req, res) => {
    try {
        const resumeData = req.body;
        
        // Basic DOCX generation logic
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        text: resumeData.personal?.fullName || "Resume",
                        heading: HeadingLevel.TITLE,
                    }),
                    new Paragraph({
                        text: `${resumeData.personal?.email || ''} | ${resumeData.personal?.phone || ''}`,
                    }),
                    new Paragraph({ text: "" }), // Spacer
                    new Paragraph({
                        text: "Summary",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({
                        text: resumeData.personal?.summary || "",
                    }),
                     // Experience Section
                    new Paragraph({
                        text: "Experience",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    ...(resumeData.experience || []).map(exp => [
                        new Paragraph({
                            text: `${exp.position} at ${exp.company}`,
                            heading: HeadingLevel.HEADING_2,
                        }),
                        new Paragraph({
                            text: exp.duration || '',
                        }),
                        new Paragraph({
                            text: exp.description || '',
                        }),
                        new Paragraph({ text: "" }),
                    ]).flat(),
                     // Education Section
                    new Paragraph({
                        text: "Education",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    ...(resumeData.education || []).map(edu => [
                        new Paragraph({
                            text: `${edu.degree}, ${edu.school}`,
                            heading: HeadingLevel.HEADING_2,
                        }),
                        new Paragraph({
                            text: edu.year || '',
                        }),
                        new Paragraph({ text: "" }),
                    ]).flat(),
                ],
            }],
        });

        const buffer = await Packer.toBuffer(doc);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename=resume.docx`);
        res.send(buffer);

    } catch (error) {
        console.error('Export DOCX error:', error);
        res.status(500).json({ error: 'Failed to generate DOCX' });
    }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.docx', '.doc', '.txt', '.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Allowed: PDF, DOCX, DOC, TXT, PNG, JPG'));
        }
    }
});

// Improved resume text parser
function parseResumeText(text) {
    console.log('\n📝 Starting resume parsing...');
    console.log('Text preview (first 500 chars):', text.substring(0, 500));
    
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    console.log(`Total lines: ${lines.length}`);
    
    // Extract email - improved pattern
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : '';
    console.log('📧 Email found:', email || 'Not found');
    
    // Extract phone - multiple patterns
    let phone = '';
    const phonePatterns = [
        /(?:\+91[\s-]?)?[789]\d{9}/,  // Indian mobile
        /(?:\+91[\s-]?)?[6-9]\d{2}[\s-]?\d{3}[\s-]?\d{4}/,  // Indian with spaces
        /\+?\d{1,3}[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/, // International
        /\d{10,12}/, // Simple 10-12 digit
        /\d{3}[\s.-]\d{3}[\s.-]\d{4}/, // US format
    ];
    for (const pattern of phonePatterns) {
        const match = text.match(pattern);
        if (match) {
            phone = match[0];
            break;
        }
    }
    console.log('📞 Phone found:', phone || 'Not found');
    
    // Extract name - first non-empty line that looks like a name
    let fullName = '';
    for (let i = 0; i < Math.min(lines.length, 5); i++) {
        const line = lines[i];
        // Skip lines that are obviously not names
        if (line.length > 50) continue;
        if (line.match(/resume|cv|curriculum|objective|summary|email|phone|address|@|www\.|http/i)) continue;
        if (line.match(/^\d+/)) continue; // Starts with number
        // This might be a name
        if (line.match(/^[A-Za-z\s.'-]+$/) && line.length > 3 && line.length < 40) {
            fullName = line;
            break;
        }
    }
    // Fallback: just use first line if nothing found
    if (!fullName && lines.length > 0) {
        fullName = lines[0].substring(0, 40);
    }
    console.log('👤 Name found:', fullName || 'Not found');
    
    // Extract job title from second or third line, or from pattern
    let jobTitle = '';
    const titlePatterns = [
        /(?:title|position|role|designation|current position)[:\s]+([^\n]+)/i,
        /^([A-Za-z\s]+(?:developer|engineer|designer|manager|analyst|intern|executive|consultant|specialist|architect|lead|officer|coordinator|assistant|associate|director|head))/im
    ];
    for (const pattern of titlePatterns) {
        const match = text.match(pattern);
        if (match) {
            jobTitle = match[1].trim();
            break;
        }
    }
    // Try lines 2-4 for job title
    if (!jobTitle) {
        for (let i = 1; i < Math.min(lines.length, 4); i++) {
            const line = lines[i];
            if (line.length > 5 && line.length < 60 && !line.match(/@|phone|email|address|www\./i)) {
                if (line.match(/developer|engineer|designer|manager|analyst|intern|student|graduate|fresher/i)) {
                    jobTitle = line;
                    break;
                }
            }
        }
    }
    console.log('💼 Job Title found:', jobTitle || 'Not found');
    
    // Extract summary/objective - more flexible
    let summary = '';
    const summaryPatterns = [
        /(?:summary|objective|about\s*me|profile|career\s*summary|professional\s*summary)[:\s]*\n?([\s\S]{20,500}?)(?=\n\s*(?:education|experience|skills|technical|work|project|certification|achievement)|$)/i,
        /(?:summary|objective|about\s*me|profile)[:\s]*([^\n]+(?:\n[^\n]+){0,3})/i
    ];
    for (const pattern of summaryPatterns) {
        const match = text.match(pattern);
        if (match) {
            summary = match[1].trim().replace(/\n+/g, ' ').substring(0, 500);
            break;
        }
    }
    console.log('📄 Summary found:', summary ? 'Yes (' + summary.length + ' chars)' : 'Not found');
    
    // Extract skills - very flexible
    const skills = [];
    const skillsPatterns = [
        /(?:skills|technical\s*skills|core\s*skills|key\s*skills|technologies|competencies)[:\s]*\n?([\s\S]+?)(?=\n\s*(?:education|experience|project|work|certification|achievement|$))/i,
        /(?:skills|technologies)[:\s]*([^\n]+)/i
    ];
    for (const pattern of skillsPatterns) {
        const match = text.match(pattern);
        if (match) {
            const skillText = match[1];
            // Split by common separators
            const skillItems = skillText.split(/[,;•\|\n\r\t]+/)
                .map(s => s.replace(/[-•*]/g, '').trim())
                .filter(s => s && s.length > 1 && s.length < 35 && !s.match(/^(and|or|the|with|using|in)$/i));
            skills.push(...skillItems.slice(0, 20));
            break;
        }
    }
    console.log('🛠️ Skills found:', skills.length, skills.slice(0, 5));
    
    // Extract experience
    const experience = [];
    const expPatterns = [
        /(?:experience|work\s*history|employment|professional\s*experience|work\s*experience)[:\s]*\n?([\s\S]+?)(?=\n\s*(?:education|skills|project|certification|achievement|hobbies|$))/i
    ];
    for (const pattern of expPatterns) {
        const match = text.match(pattern);
        if (match) {
            const expText = match[1];
            // Split by double newlines or look for job titles
            const blocks = expText.split(/\n{2,}/).filter(b => b.trim().length > 10);
            
            for (const block of blocks.slice(0, 4)) {
                const blockLines = block.split('\n').map(l => l.trim()).filter(l => l);
                if (blockLines.length > 0) {
                    let position = blockLines[0] || '';
                    let company = blockLines.length > 1 ? blockLines[1] : '';
                    let duration = '';
                    let description = '';
                    
                    // Look for date in any line
                    for (const line of blockLines) {
                        const dateMatch = line.match(/\d{4}\s*[-–to]\s*(\d{4}|present|current|now|till\s*date)/i) ||
                                         line.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*\d{4}\s*[-–to]/i);
                        if (dateMatch) {
                            duration = line;
                            break;
                        }
                    }
                    
                    // Description is remaining lines
                    if (blockLines.length > 2) {
                        description = blockLines.slice(2).join('\n');
                    }
                    
                    if (position && position.length < 100) {
                        experience.push({ position, company, duration, description });
                    }
                }
            }
            break;
        }
    }
    console.log('💼 Experience entries found:', experience.length);
    
    // Extract education
    const education = [];
    const eduPatterns = [
        /(?:education|academic|qualification|educational\s*background)[:\s]*\n?([\s\S]+?)(?=\n\s*(?:experience|skills|project|certification|work|achievement|$))/i
    ];
    for (const pattern of eduPatterns) {
        const match = text.match(pattern);
        if (match) {
            const eduText = match[1];
            const blocks = eduText.split(/\n{2,}/).filter(b => b.trim().length > 5);
            
            for (const block of blocks.slice(0, 3)) {
                const blockLines = block.split('\n').map(l => l.trim()).filter(l => l);
                if (blockLines.length > 0) {
                    let degree = blockLines[0] || '';
                    let school = blockLines.length > 1 ? blockLines[1] : '';
                    let year = '';
                    
                    // Look for year
                    for (const line of blockLines) {
                        const yearMatch = line.match(/\d{4}/);
                        if (yearMatch) {
                            year = yearMatch[0];
                            break;
                        }
                    }
                    
                    if (degree && degree.length < 100) {
                        education.push({ degree, school, year, gpa: '' });
                    }
                }
            }
            break;
        }
    }
    console.log('🎓 Education entries found:', education.length);
    
    // Extract projects
    const projects = [];
    const projMatch = text.match(/(?:projects?|personal\s*projects?|academic\s*projects?)[:\s]*\n?([\s\S]+?)(?=\n\s*(?:education|experience|skills|certification|achievement|$))/i);
    if (projMatch) {
        const projText = projMatch[1];
        const blocks = projText.split(/\n{2,}/).filter(b => b.trim().length > 10);
        
        for (const block of blocks.slice(0, 4)) {
            const blockLines = block.split('\n').map(l => l.trim()).filter(l => l);
            if (blockLines.length > 0) {
                projects.push({
                    name: blockLines[0],
                    role: '',
                    description: blockLines.slice(1).join(' '),
                    year: ''
                });
            }
        }
    }
    console.log('📁 Projects found:', projects.length);
    
    const result = {
        personal: {
            fullName: fullName || 'Your Name',
            email: email || '',
            phone: phone || '',
            jobTitle: jobTitle || '',
            summary: summary || '',
            photo: null,
            website: '',
            address: ''
        },
        experience: experience,
        education: education,
        skills: skills,
        projects: projects,
        certifications: []
    };
    
    console.log('\n✅ Parsing complete! Result:', JSON.stringify(result, null, 2));
    return result;
}

// Extract text from PDF
async function extractFromPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

// Extract text from DOCX
async function extractFromDOCX(filePath) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
}

// Extract text from image using OCR
async function extractFromImage(filePath) {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
        logger: m => console.log(m.status, m.progress)
    });
    return text;
}

// Extract text from TXT
function extractFromTXT(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

// Main API endpoint for resume parsing
app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        let extractedText = '';

        console.log(`\n📥 Processing file: ${req.file.originalname} (${ext})`);

        // Extract text based on file type
        switch (ext) {
            case '.pdf':
                extractedText = await extractFromPDF(filePath);
                if (extractedText.trim().length < 50) {
                    console.log('⚠️ PDF appears to be scanned or image-based. Text extraction limited.');
                    console.log('💡 Tip: Try uploading a text-based PDF or DOCX for better results.');
                }
                break;
            case '.docx':
            case '.doc':
                extractedText = await extractFromDOCX(filePath);
                break;
            case '.txt':
                extractedText = extractFromTXT(filePath);
                break;
            case '.png':
            case '.jpg':
            case '.jpeg':
                extractedText = await extractFromImage(filePath);
                break;
            default:
                return res.status(400).json({ error: 'Unsupported file type' });
        }

        console.log(`📊 Extracted ${extractedText.length} characters from file`);
        if (extractedText.length === 0) {
            console.warn('⚠️ No text extracted from file!');
            return res.status(400).json({ error: 'Could not extract text from file. The file may be corrupt or unsupported.' });
        }
        
        console.log('------- FULL EXTRACTED TEXT -------');
        console.log(extractedText);
        console.log('------- END OF TEXT -------\n');

        // Parse the extracted text
        const parsedData = parseResumeText(extractedText);

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            rawText: extractedText.substring(0, 2000),
            data: parsedData
        });

    } catch (error) {
        console.error('❌ Error parsing resume:', error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: error.message || 'Failed to parse resume' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Resume Parser API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✅ Resume Parser API running on http://localhost:${PORT}`);
    console.log(`📄 POST /api/parse-resume - Upload resume for parsing`);
    console.log(`❤️ GET /api/health - Health check\n`);
});
