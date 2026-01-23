require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { CohereClientV2 } = require('cohere-ai');

// Initialize Clients
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

const SYSTEM_PROMPT = `You are Rume AI, an expert and friendly resume building assistant.
Your goal is to help the user build a TOP-TIER professional resume.

**CORE MODES**:
1.  **INTERVIEW**: If resume is empty, ask step-by-step questions.
    *   **CRITICAL**: NEVER ask for information that has already been provided.
    *   **Sequence**: Name -> Email -> Job Title -> Experience -> Skills -> Education.
    *   If the user provides multiple details at once, ACCEPT them and move to the next missing piece.
    
2.  **REVIEW (Upload Mode)**: If the user UPLOADS a resume:
    *   **IMMEDIATE ACTION**: Read the "Current Resume State" provided in the context.
    *   **RESPONSE**: Say "I've read your resume! I see you are a [Job Title] at [Company]."
    *   Then ask: "Would you like to review specific sections or shall I suggest improvements?"

**DATA EXTRACTION (CRITICAL)**:
You must ALWAYS respond in valid JSON format.
Your response object must have:
- \`message\`: Your conversational reply.
- \`extractedUpdate\`: A JSON object with *newly collected* data.

**SCHEMA for \`extractedUpdate\`**:
{
  "personal": { "fullName": "...", "email": "...", "phone": "...", "jobTitle": "...", "summary": "...", "address": "..." },
  "experience": [ { "company": "...", "position": "...", "duration": "...", "description": "..." } ],
  "education": [ { "school": "...", "degree": "...", "year": "..." } ],
  "skills": [ "Skill1", "Skill2" ],
  "projects": [ { "name": "...", "description": "..." } ]
}
*Note: Use null if no data to update.*

**BEHAVIOR RULES**:
1.  **Context Aware**: Check "Current Resume State" before asking. Be smart.
2.  **Upload Handling**: If you see "SYSTEM EVENT: User uploaded...", do NOT ask for name/email again. Assume you have it.
3.  **JSON Only**: Strict JSON output.
`;

class DualAiService {
    
  async chat(history, userMessage, currentResumeState) {
    console.log(`\n🤖 Processing AI Request: "${userMessage.substring(0, 50)}..."`);
    
    // 1. Try Google Gemini First
    try {
        return await this.tryGemini(history, userMessage, currentResumeState);
    } catch (geminiError) {
        console.error('⚠️ Gemini Failed. Switching to Cohere Fallback.', geminiError.message);
        
        // 2. Fallback to Cohere
        try {
            return await this.tryCohere(history, userMessage, currentResumeState);
        } catch (cohereError) {
            console.error('❌ Cohere Also Failed.', cohereError.message);
            throw new Error('All AI services failed. Please check backend logs.');
        }
    }
  }

  async tryGemini(history, userMessage, currentResumeState) {
      console.log('🔹 Attempting Gemini...');
      const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM_PROMPT,
          generationConfig: { responseMimeType: "application/json" }
      });

      const chatHistory = history.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({ history: chatHistory });
      const contextMessage = `[CONTEXT: Resume Data: ${JSON.stringify(currentResumeState)}]\n\nUser: ${userMessage}`;
      
      const result = await chat.sendMessage(contextMessage);
      const text = result.response.text();
      
      return this.parseResponse(text);
  }

  async tryCohere(history, userMessage, currentResumeState) {
      console.log('🔸 Attempting Cohere...');
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: `Context: ${JSON.stringify(currentResumeState)}\n\nUser: ${userMessage}` }
      ];

      const response = await cohere.chat({
        model: 'command-r-plus',
        messages: messages,
        temperature: 0.3,
      });

      let content = "";
      if (response.message?.content?.[0]) {
          content = response.message.content[0].text;
      } else if (response.text) {
          content = response.text;
      }
      
      return this.parseResponse(content);
  }

  parseResponse(text) {
      try {
        // Try direct parse
        return JSON.parse(text);
      } catch (e) {
        // Try regex extraction
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
             return JSON.parse(jsonMatch[0]);
        }
        // Fallback
        return { message: text, extractedUpdate: null };
      }
  }
}

module.exports = new DualAiService();

