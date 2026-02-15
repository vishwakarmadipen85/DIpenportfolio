"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";

interface AvailabilityBadgeProps {
    available?: boolean;
    message?: string;
}

export const AvailabilityBadge = ({
    available = true,
    message = "Open to opportunities",
}: AvailabilityBadgeProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
        >
            <div className="relative">
                <Circle
                    className={`w-2 h-2 ${available ? "fill-emerald-400 text-emerald-400" : "fill-red-400 text-red-400"
                        }`}
                />
                {available && (
                    <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 absolute top-0 left-0 animate-ping" />
                )}
            </div>
            <span className="text-xs text-zinc-300">{message}</span>
        </motion.div>
    );
};
