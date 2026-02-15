"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Trophy } from "lucide-react";

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: "explorer",
        title: "Explorer",
        description: "Visited all main sections of the portfolio.",
    },
    {
        id: "hacker",
        title: "Hacker Mode",
        description: "Accessed the secret terminal.",
    },
    {
        id: "audiophile",
        title: "Audiophile",
        description: "Enabled ambient sound.",
    },
    {
        id: "recruiter",
        title: "Head Hunter",
        description: "Downloaded the resume.",
    },
];

interface AchievementContextType {
    unlockedAchievements: string[];
    unlockAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider = ({ children }: { children: React.ReactNode }) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const saved = localStorage.getItem("achievements");
        if (saved) {
            setUnlockedAchievements(JSON.parse(saved));
        }
    }, []);

    const unlockAchievement = (id: string) => {
        if (unlockedAchievements.includes(id)) return;

        const achievement = ACHIEVEMENTS.find((a) => a.id === id);
        if (!achievement) return;

        const newUnlocked = [...unlockedAchievements, id];
        setUnlockedAchievements(newUnlocked);
        localStorage.setItem("achievements", JSON.stringify(newUnlocked));

        toast({
            title: "Achievement Unlocked! 🏆",
            description: `${achievement.title}: ${achievement.description}`,
            duration: 5000,
            className: "border-yellow-500/50 bg-black/90 text-white",
        });
    };

    return (
        <AchievementContext.Provider value={{ unlockedAchievements, unlockAchievement }}>
            {children}
        </AchievementContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (context === undefined) {
        throw new Error("useAchievements must be used within an AchievementProvider");
    }
    return context;
};
