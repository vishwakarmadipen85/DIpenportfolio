"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";
import { config } from "@/data/config";

interface Message {
    id: string;
    role: "user" | "bot";
    text: string;
}

const PRESET_QUESTIONS = [
    "Who is Dipen?",
    "What are your skills?",
    "Show me projects",
    "Contact info",
];

const AiChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "bot",
            text: "Hi there! I'm Aana, Dipen's AI assistant. How can I help you navigate his portfolio today? 🤖",
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [showPresets, setShowPresets] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = async (text: string) => {
        // User Message
        const userMsg: Message = { id: Date.now().toString(), role: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setShowPresets(false);
        setIsTyping(true);

        // Simulate AI Delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Bot Response Logic
        let botText = "";
        const lowerText = text.toLowerCase();

        if (lowerText.includes("who") || lowerText.includes("dipen")) {
            botText = config.description.short + " He is passionate about building intelligent systems.";
        } else if (lowerText.includes("skills") || lowerText.includes("stack")) {
            botText = "Dipen is proficient in React, Next.js, TypeScript, Python, and AI/ML technologies. He loves 3D web experiences too!";
        } else if (lowerText.includes("project")) {
            botText = "He has built some cool stuff! AEROSTEP AI, NEO Commander, and of course, this 3D portfolio. Check out the Projects section!";
            // Scroll to projects
            setTimeout(() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }, 1500);
        } else if (lowerText.includes("contact") || lowerText.includes("email")) {
            botText = `You can reach him at ${config.email}. He's always open to interesting collaborations!`;
        } else {
            botText = "I'm just a simulated AI, but I think Dipen is the one you want to talk to! Try asking about his skills or projects.";
        }

        const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", text: botText };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        setShowPresets(true);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-[99998] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Aana</h3>
                                    <p className="text-xs text-blue-100">AI Assistant • Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 p-1 rounded transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[80%] p-3 rounded-2xl text-sm",
                                            msg.role === "user"
                                                ? "bg-blue-600 text-white rounded-tr-none"
                                                : "bg-white/10 border border-white/10 text-white rounded-tl-none"
                                        )}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input / Presets */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            {showPresets && !isTyping && (
                                <div className="flex gap-2 overflow-x-auto pb-3 mb-2 custom-scrollbar">
                                    {PRESET_QUESTIONS.map(q => (
                                        <button
                                            key={q}
                                            onClick={() => handleSendMessage(q)}
                                            className="whitespace-nowrap bg-white/5 hover:bg-white/10 border border-white/10 text-xs px-3 py-1.5 rounded-full text-zinc-300 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // Disable manual typing for this sim if strict, but let's allow it
                                    const input = (e.target as any).message.value;
                                    if (input.trim()) {
                                        handleSendMessage(input);
                                        (e.target as any).reset();
                                    }
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    name="message"
                                    type="text"
                                    placeholder="Ask Aana..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
                                    autoComplete="off"
                                />
                                <Button size="icon" className="rounded-full w-10 h-10 bg-blue-600 hover:bg-blue-700">
                                    <Send size={16} />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/20 z-[99999] flex items-center justify-center text-white"
            >
                {isOpen ? <X size={24} /> : <Bot size={28} />}
            </motion.button>
        </>
    );
};

export default AiChat;
