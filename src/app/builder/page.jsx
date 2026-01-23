import { useState, useRef, useEffect } from "react";
import { ResumeForm } from "./components/resume-form";
import { ResumePreview } from "./components/resume-preview";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { BuilderNavbar } from "../components/builder-navbar";

export default function ResumeBuilderPage() {
    const [searchParams] = useSearchParams();
    const location = useLocation(); // Hook for state passed via navigation
    const initialTemplate = searchParams.get('template') || 'modern';
    const isEnhanced = searchParams.get('enhanced') === 'true';

    const [activeMode, setActiveMode] = useState("beginner");

    const [activeTemplate, setActiveTemplate] = useState(initialTemplate);
    const [showPreview, setShowPreview] = useState(true);
    const componentRef = useRef();
    const [dataLoaded, setDataLoaded] = useState(false);

    // Styling state
    const [resumeStyle, setResumeStyle] = useState({
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        primaryColor: "#2563eb",
        secondaryColor: "#3b82f6",
    });

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Resume',
    });



    const [resumeData, setResumeData] = useState({
        personal: {
            fullName: "John Doe",
            email: "john.doe@email.com",
            phone: "+1 234 567 8900",
            jobTitle: "Software Developer",
            summary: "Passionate software developer with 3+ years of experience in building web applications. Skilled in React, Node.js, and modern web technologies. Strong problem-solving abilities and excellent team collaboration skills.",
            photo: null,
            website: "www.johndoe.com",
            address: "New York, USA",
        },
        experience: [
            {
                company: "Tech Solutions Inc.",
                position: "Senior Software Developer",
                duration: "2022 - Present",
                description: "• Developed and maintained React-based web applications\n• Led a team of 3 developers on client projects\n• Improved application performance by 40%"
            },
            {
                company: "Digital Agency Co.",
                position: "Junior Developer",
                duration: "2020 - 2022",
                description: "• Built responsive websites using HTML, CSS, JavaScript\n• Collaborated with designers to implement UI/UX designs\n• Participated in code reviews and team meetings"
            }
        ],
        education: [
            {
                school: "University of Technology",
                degree: "Bachelor of Science in Computer Science",
                year: "2016 - 2020",
                gpa: "3.8 / 4.0"
            }
        ],
        skills: ["React", "JavaScript", "Node.js", "Python", "SQL", "Git", "AWS", "Tailwind CSS"],
        projects: [
            {
                name: "E-Commerce Platform",
                role: "Full Stack Developer",
                description: "Built a complete e-commerce solution with payment integration and admin dashboard.",
                year: "2023"
            },
            {
                name: "Portfolio Website",
                role: "React, Node.js, MongoDB",
                description: "Personal portfolio website showcasing projects and blog posts.",
                year: "2022"
            }
        ],
        certifications: [
            {
                name: "AWS Certified Developer",
                issuer: "Amazon Web Services",
                year: "2023"
            },
            {
                name: "React Developer Certification",
                issuer: "Meta",
                year: "2022"
            }
        ]
    });

    // Load data from navigation state or sessionStorage
    useEffect(() => {
        // 1. Check if data passed via navigation (e.g., from AI Builder)
        if (location.state?.initialData) {
            console.log('Loading data from navigation state:', location.state.initialData);
            setResumeData(prev => ({
                personal: { ...prev.personal, ...location.state.initialData.personal },
                experience: location.state.initialData.experience?.length > 0 ? location.state.initialData.experience : prev.experience,
                education: location.state.initialData.education?.length > 0 ? location.state.initialData.education : prev.education,
                skills: location.state.initialData.skills?.length > 0 ? location.state.initialData.skills : prev.skills,
                projects: location.state.initialData.projects?.length > 0 ? location.state.initialData.projects : prev.projects,
                certifications: location.state.initialData.certifications?.length > 0 ? location.state.initialData.certifications : prev.certifications,
            }));
            return; // Stop if data found in state
        }

        // 2. Fallback to Session Storage (Legacy/Enhance flow)
        const enhancedData = sessionStorage.getItem('enhancedResumeData');
        if (enhancedData) {
            try {
                const parsed = JSON.parse(enhancedData);
                console.log('Loading enhanced data from session:', parsed); 

                setResumeData(prev => ({
                    personal: { ...prev.personal, ...parsed.personal },
                    experience: parsed.experience?.length > 0 ? parsed.experience : prev.experience,
                    education: parsed.education?.length > 0 ? parsed.education : prev.education,
                    skills: parsed.skills?.length > 0 ? parsed.skills : prev.skills,
                    projects: parsed.projects?.length > 0 ? parsed.projects : prev.projects,
                    certifications: parsed.certifications?.length > 0 ? parsed.certifications : prev.certifications,
                }));

                sessionStorage.removeItem('enhancedResumeData');
            } catch (e) {
                console.error('Error parsing enhanced resume data:', e);
            }
        }
    }, [location.state]); // Add location.state to dependency

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Builder Navbar */}
            <BuilderNavbar
                resumeStyle={resumeStyle}
                setResumeStyle={setResumeStyle}
                onDownload={handlePrint}
            />

            {/* Spacer for fixed navbar */}
            <div className="h-20"></div>

            {/* Main Content Area */}
            <main className="pt-4 pb-8 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Mode Toggle and Template Selector */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        {/* Mode Toggle */}
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveMode("beginner")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeMode === "beginner"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Beginner
                            </button>
                            <button
                                onClick={() => setActiveMode("professional")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeMode === "professional"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Professional
                            </button>
                        </div>

                        {/* Template Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Template:</span>
                            <select
                                value={activeTemplate}
                                onChange={(e) => setActiveTemplate(e.target.value)}
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <optgroup label=" ATS-Optimized (Score 90+)">
                                    <option value="modern-ats">Modern ATS</option>
                                    <option value="classic-ats">Classic ATS</option>
                                    <option value="executive-ats">Executive ATS</option>
                                    <option value="elegant-ats">Elegant ATS</option>
                                    <option value="creative-ats">Creative ATS</option>
                                </optgroup>
                                <optgroup label=" Original Templates (Visual)">
                                    <option value="executive">Executive</option>
                                    <option value="modern">Modern</option>
                                    <option value="elegant">Elegant</option>
                                    <option value="creative">Creative</option>
                                    <option value="classic">Classic</option>
                                </optgroup>
                            </select>

                            {/* Preview Toggle (Mobile) */}
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                                title="Toggle Preview"
                            >
                                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                <span className="text-sm">{showPreview ? 'Form' : 'Preview'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left Column: Form */}
                        <div className={`${showPreview && 'hidden lg:block'} bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden`}>
                            {/* Form Header */}
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h1 className="text-xl font-bold text-gray-900">Build Your Resume</h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    {activeMode === "beginner"
                                        ? "Focus on your education, skills, and projects."
                                        : "Highlight your work experience and career achievements."}
                                </p>
                            </div>

                            {/* Form Content */}
                            <div className="p-6 max-h-[calc(100vh-280px)] overflow-y-auto">
                                <ResumeForm
                                    data={resumeData}
                                    updateData={setResumeData}
                                    mode={activeMode}
                                />
                            </div>
                        </div>

                        {/* Right Column: Preview */}
                        <div className={`${!showPreview && 'hidden lg:block'} bg-gray-200 rounded-xl shadow-inner overflow-hidden flex flex-col`}>
                            {/* Preview Header */}
                            <div className="px-6 py-3 border-b border-gray-300 bg-white flex items-center justify-between flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700">Live Preview</span>
                                </div>
                                <span className="text-xs text-gray-500">A4 Format</span>
                            </div>

                            {/* Preview Content - Full scrollable area */}
                            <div className="flex-1 p-2 overflow-auto bg-gray-300" style={{ minHeight: '500px' }}>
                                <div
                                    className="bg-white shadow-xl mx-auto"
                                    style={{
                                        width: '210mm',
                                        transform: 'scale(0.45)',
                                        transformOrigin: 'top center',
                                        marginTop: '-10px',
                                    }}
                                >
                                    <ResumePreview
                                        ref={componentRef}
                                        data={resumeData}
                                        mode={activeMode}
                                        template={activeTemplate}
                                        style={resumeStyle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page { 
                        size: A4; 
                        margin: 0; 
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                    html, body { 
                        width: 210mm;
                        height: 297mm;
                        margin: 0;
                        padding: 0;
                        background: white !important;
                    }
                    nav, .fixed, button, .no-print, header { 
                        display: none !important; 
                    }
                    main { 
                        padding: 0 !important; 
                        margin: 0 !important;
                    }
                    .grid { 
                        display: block !important; 
                    }
                    .bg-white.rounded-xl:first-child { 
                        display: none !important; 
                    }
                    .bg-gray-200 { 
                        background: transparent !important; 
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        overflow: visible !important;
                    }
                    .bg-gray-200 > div:first-child { 
                        display: none !important; 
                    }
                    .origin-top {
                        transform: none !important;
                        margin-bottom: 0 !important;
                    }
                    .shadow-2xl { 
                        box-shadow: none !important; 
                    }
                    #resume-preview { 
                        width: 210mm !important;
                        min-height: 297mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                    }
                    #resume-preview > div {
                        width: 210mm !important;
                        min-height: 297mm !important;
                    }
                }
            `}</style>
        </div>
    );
}
