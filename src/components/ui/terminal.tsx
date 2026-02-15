"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
import { useRouter } from "next/navigation";

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CommandHistory {
    command: string;
    output: React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandHistory[]>([
        {
            command: "welcome",
            output: (
                <div className="mb-2">
                    <p>Welcome to DipenOS v1.0.0</p>
                    <p>Type <span className="text-green-400">help</span> to see available commands.</p>
                </div>
            ),
        },
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = "";

        switch (trimmedCmd) {
            case "help":
                output = (
                    <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-green-400">about</span> Display information about me
                        <span className="text-green-400">projects</span> View my projects
                        <span className="text-green-400">skills</span> List technical skills
                        <span className="text-green-400">contact</span> Show contact info
                        <span className="text-green-400">clear</span> Clear the terminal
                        <span className="text-green-400">exit</span> Close the terminal
                        <span className="text-green-400">sudo</span> ???
                    </div>
                );
                break;
            case "about":
                output = (
                    <div>
                        <p>{config.description.short}</p>
                        <p className="mt-1 text-zinc-400 italic">{config.description.long}</p>
                    </div>
                );
                break;
            case "projects":
                output = "Navigating to Projects section...";
                setTimeout(() => {
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
                    onClose();
                }, 1000);
                break;
            case "contact":
                output = (
                    <div>
                        <p>Email: <a href={`mailto:${config.email}`} className="text-blue-400 underline">{config.email}</a></p>
                        <p>GitHub: <a href={config.social.github} target="_blank" className="text-blue-400 underline">Link</a></p>
                        <p>LinkedIn: <a href={config.social.linkedin} target="_blank" className="text-blue-400 underline">Link</a></p>
                    </div>
                );
                break;
            case "skills":
                output = (
                    <div className="flex flex-wrap gap-2">
                        {["React", "Next.js", "TypeScript", "Python", "Node.js", "AI/ML"].map(s => (
                            <span key={s} className="bg-zinc-800 px-2 py-0.5 rounded text-xs">{s}</span>
                        ))}
                    </div>
                );
                break;
            case "sudo":
                output = <span className="text-red-500 font-bold">Permission denied: You are not Dipen.</span>;
                break;
            case "exit":
                onClose();
                return;
            case "clear":
                setHistory([]);
                return;
            case "":
                return;
            default:
                output = <span className="text-red-400">Command not found: {trimmedCmd}. Type 'help' for options.</span>;
        }

        setHistory((prev) => [...prev, { command: cmd, output }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-full max-w-2xl h-[400px] bg-black/90 border border-zinc-800 rounded-lg shadow-2xl flex flex-col font-mono text-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-zinc-400 text-xs">dipen@portfolio:~</span>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white">
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" onClick={() => inputRef.current?.focus()}>
                    {history.map((entry, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex gap-2 text-zinc-400">
                                <span className="text-green-500">➜</span>
                                <span className="text-blue-500">~</span>
                                <span>{entry.command}</span>
                            </div>
                            <div className="ml-4 mt-1 text-zinc-300">
                                {entry.output}
                            </div>
                        </div>
                    ))}

                    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-500">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-600"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </form>
                    <div ref={bottomRef} />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
