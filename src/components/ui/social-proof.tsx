"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, Users } from "lucide-react";
import { config } from "@/data/config";
import { motion } from "framer-motion";

interface GitHubStats {
    stars: number;
    forks: number;
    followers: number;
}

export const SocialProof = () => {
    const [stats, setStats] = useState<GitHubStats>({ stars: 0, forks: 0, followers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch(`https://api.github.com/users/${config.githubUsername}`);
                const userData = await userResponse.json();

                // Fetch repos to calculate total stars
                const reposResponse = await fetch(
                    `https://api.github.com/users/${config.githubUsername}/repos?per_page=100`
                );
                const reposData = await reposResponse.json();

                const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
                const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

                setStats({
                    stars: totalStars,
                    forks: totalForks,
                    followers: userData.followers || 0,
                });
            } catch (error) {
                console.error("Failed to fetch GitHub stats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (config.githubUsername) {
            fetchStats();
        }
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4 animate-pulse">
                        <div className="h-8 bg-white/10 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    const metrics = [
        { icon: Star, label: "Stars", value: stats.stars, color: "text-yellow-400" },
        { icon: GitFork, label: "Forks", value: stats.forks, color: "text-blue-400" },
        { icon: Users, label: "Followers", value: stats.followers, color: "text-purple-400" },
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                    <metric.icon className={`w-5 h-5 ${metric.color} mb-2`} />
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-xs text-zinc-400">{metric.label}</p>
                </motion.div>
            ))}
        </div>
    );
};
