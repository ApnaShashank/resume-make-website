import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AiChatInterface({ messages, onSendMessage, onFileUpload, isTyping }) {
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (inputValue.trim() && !isTyping) {
            onSendMessage(inputValue);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileUpload(file);
            // Clear input so same file can be selected again if needed
            e.target.value = '';
        }
    };

    return (
        <div className="flex flex-col h-full bg-surface rounded-2xl shadow-lg border border-border-main overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-dark p-4 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-white text-lg">Rume AI</h2>
                    <p className="text-secondary/80 text-xs">Professional Resume Assistant</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-app-bg/50">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[85%] items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                                    ${msg.role === 'user' ? 'bg-primary' : 'bg-dark'}`}>
                                    {msg.role === 'user' ? 
                                        <User className="w-4 h-4 text-white" /> : 
                                        <Bot className="w-4 h-4 text-white" />
                                    }
                                </div>

                                {/* Message Bubble */}
                                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                                    ${msg.role === 'user' 
                                        ? 'bg-primary text-white rounded-br-none' 
                                        : 'bg-surface text-text-main border border-border-main rounded-bl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-surface border border-border-main p-4 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-surface border-t border-border-main">
                <div className="flex gap-2 items-end bg-app-bg/50 border border-border-main rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".pdf,.docx,.doc,.txt" 
                        className="hidden" 
                    />
                    <button
                        onClick={handleFileClick}
                        disabled={isTyping}
                        className="p-3 text-primary/70 hover:text-primary hover:bg-secondary/20 rounded-lg transition-colors mb-0.5"
                        title="Upload Resume"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your answer here..."
                        className="flex-1 bg-transparent border-none resize-none focus:ring-0 max-h-32 min-h-[44px] py-3 px-2 text-text-main placeholder-text-muted/60 text-sm"
                        rows={1}
                        disabled={isTyping}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                        className={`p-3 rounded-lg mb-0.5 transition-all
                            ${!inputValue.trim() || isTyping
                                ? 'bg-secondary/30 text-text-muted cursor-not-allowed'
                                : 'bg-primary text-white hover:opacity-90 shadow-md hover:shadow-lg active:scale-95'
                            }`}
                    >
                        {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
                <p className="text-center text-xs text-text-muted/70 mt-2">
                    Press Enter to send • Rume AI can make mistakes, please double check important info.
                </p>
            </div>
        </div>
    );
}
