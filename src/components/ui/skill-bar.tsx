"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
    name: string;
    level: number; // 0-100
    color?: string;
}

export const SkillBar = ({ name, level, color = "from-blue-500 to-purple-500" }: SkillBarProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-zinc-300">{name}</span>
                <span className="text-zinc-500">{level}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                />
            </div>
        </div>
    );
};
