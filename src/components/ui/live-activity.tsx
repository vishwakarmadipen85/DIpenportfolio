"use client";

import React, { useState, useEffect } from "react";
import { Activity, Music, Code2, Coffee } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const STATUSES = [
    { icon: Code2, text: "Coding AEROSTEP", color: "text-blue-400" },
    { icon: Music, text: "Listening to Lo-Fi", color: "text-green-400" },
    { icon: Coffee, text: "Refueling with Coffee", color: "text-amber-400" },
    { icon: Activity, text: "Training AI Model", color: "text-purple-400" },
];

const LiveActivity = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % STATUSES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const CurrentStatus = STATUSES[index];

    return (
        <div className="fixed top-24 right-6 z-[9990] pointer-events-none hidden md:block">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg"
                >
                    <div className="relative">
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse z-10" />
                        <CurrentStatus.icon className={`w-4 h-4 ${CurrentStatus.color}`} />
                    </div>
                    <span className="text-xs font-mono text-zinc-300">
                        {CurrentStatus.text}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LiveActivity;
