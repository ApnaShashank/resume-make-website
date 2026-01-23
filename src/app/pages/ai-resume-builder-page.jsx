import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, ChevronRight, Sun, Moon } from 'lucide-react';
import { AiChatInterface } from '../components/ai-chat-interface';
import { useTheme } from '../../context/ThemeContext';

// Default empty state
const INITIAL_STATE = {
    personal: { fullName: '', email: '', phone: '', jobTitle: '', summary: '', address: '' },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
};

export default function AiResumeBuilderPage() {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    
    // This state accumulates data from the AI interaction
    const [resumeData, setResumeData] = useState(INITIAL_STATE);

    // Initial greeting
    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            addBotMessage("Hi! I'm Rume AI. I'm here to build your professional resume. You can upload an existing resume or we can start from scratch. What is your full name?");
        }
    }, []);

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    };

    const handleSendMessage = async (userMessage) => {
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsTyping(true);

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-10), // Send last 10 messages for context
                    currentResume: resumeData
                })
            });

            const data = await response.json();
            
            if (data.extractedUpdate && Object.keys(data.extractedUpdate).length > 0) {
                setResumeData(prev => {
                    // Deep merge the extracted update
                    const merged = { ...prev };
                    
                    // Merge personal data
                    if (data.extractedUpdate.personal) {
                        merged.personal = { ...prev.personal, ...data.extractedUpdate.personal };
                    }
                    
                    // Merge array fields (experience, education, skills, projects, certifications)
                    if (data.extractedUpdate.experience && data.extractedUpdate.experience.length > 0) {
                        merged.experience = data.extractedUpdate.experience;
                    }
                    if (data.extractedUpdate.education && data.extractedUpdate.education.length > 0) {
                        merged.education = data.extractedUpdate.education;
                    }
                    if (data.extractedUpdate.skills && data.extractedUpdate.skills.length > 0) {
                        merged.skills = data.extractedUpdate.skills;
                    }
                    if (data.extractedUpdate.projects && data.extractedUpdate.projects.length > 0) {
                        merged.projects = data.extractedUpdate.projects;
                    }
                    if (data.extractedUpdate.certifications && data.extractedUpdate.certifications.length > 0) {
                        merged.certifications = data.extractedUpdate.certifications;
                    }
                    
                    return merged;
                });
            }

            addBotMessage(data.message || data.reply || "I'm having trouble responding right now.");
        } catch (error) {
            console.error("Chat error:", error);
            addBotMessage("Sorry, I encountered an error connecting to my brain. Please check if the server is running.");
        } finally {
            setIsTyping(false);
        }
    };

    const handleFileUpload = async (file) => {
        setIsTyping(true);
        addBotMessage(`Analyzing ${file.name}...`);

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('/api/parse-resume', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success && result.data) {
                // Properly merge all extracted data, replacing entire sections
                setResumeData(prev => {
                    const merged = {
                        personal: { ...result.data.personal },
                        experience: result.data.experience && result.data.experience.length > 0 
                            ? result.data.experience 
                            : prev.experience,
                        education: result.data.education && result.data.education.length > 0 
                            ? result.data.education 
                            : prev.education,
                        skills: result.data.skills && result.data.skills.length > 0 
                            ? result.data.skills 
                            : prev.skills,
                        projects: result.data.projects && result.data.projects.length > 0 
                            ? result.data.projects 
                            : prev.projects,
                        certifications: result.data.certifications && result.data.certifications.length > 0 
                            ? result.data.certifications 
                            : prev.certifications
                    };
                    return merged;
                });
                addBotMessage(`I've analyzed your resume! I found details for ${result.data.personal?.fullName || 'you'}. Let's double-check some details. Is your contact information correct?`);
                
                // Also trigger a system message to the AI so it knows about the upload
                handleSendMessage(`SYSTEM EVENT: User uploaded a file. Extracted data: ${JSON.stringify(result.data)}`);
            } else {
                addBotMessage("I've received your file, but I couldn't extract all the details. Let's go through it together. What's your full name?");
            }
        } catch (error) {
            console.error("Upload error:", error);
            addBotMessage("Sorry, I had trouble reading the file. Let's continue via chat.");
        } finally {
            setIsTyping(false);
        }
    };

    const handleSeeResume = () => {
        navigate('/builder', { 
            state: { initialData: resumeData } 
        });
    };

    return (
        <div className="min-h-screen bg-app-bg text-text-main flex flex-col transition-colors duration-300 font-sans">
            {/* Header */}
            <header className="bg-surface/80 backdrop-blur-md border-b border-border-main py-3 px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-secondary/20 rounded-full transition-colors text-text-muted hover:text-text-main"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <h1 className="text-lg font-bold text-text-main">Rume AI</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                     {/* Theme Toggle */}
                     <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full hover:bg-secondary/20 text-text-main transition-all border border-border-main shadow-sm bg-surface"
                        title="Toggle Theme"
                     >
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                     </button>

                     <p className="hidden md:block text-xs text-text-muted mr-2 font-medium">
                        Details are auto-saved.
                     </p>
                     <button 
                        onClick={handleSeeResume}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:opacity-90 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 animate-pulse-subtle"
                    >
                        <FileText className="w-4 h-4" />
                        <span>See Resume</span>
                        <ChevronRight className="w-4 h-4 opacity-80" />
                    </button>
                </div>
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 flex justify-center p-4 md:p-6 lg:p-8 overflow-hidden h-[calc(100vh-64px)]">
                <div className="w-full max-w-4xl h-full flex flex-col">
                    <AiChatInterface 
                         messages={messages} 
                         onSendMessage={handleSendMessage}
                         onFileUpload={handleFileUpload}
                         isTyping={isTyping}
                    />
                </div>
            </main>

            {/* Subtle Pulse Animation */}
            <style>{`
                @keyframes pulse-subtle {
                    0%, 100% { box-shadow: 0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06); }
                    50% { box-shadow: 0 10px 15px -3px rgba(30, 58, 138, 0.2), 0 4px 6px -2px rgba(30, 58, 138, 0.1); }
                }
                .animate-pulse-subtle {
                    animation: pulse-subtle 3s infinite;
                }
            `}</style>
        </div>
    );
}
