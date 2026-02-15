"use client";

import { useEffect, useState } from "react";
import { GitBranch, GitCommit, Star } from "lucide-react";
import { config } from "@/data/config";

interface GitHubEvent {
    id: string;
    type: string;
    repo: {
        name: string;
    };
    payload: {
        commits?: Array<{ message: string }>;
    };
    created_at: string;
}

export const GitHubActivity = () => {
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${config.githubUsername}/events/public?per_page=5`
                );
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch GitHub activity:", error);
            } finally {
                setLoading(false);
            }
        };

        if (config.githubUsername) {
            fetchActivity();
        }
    }, []);

    if (loading) {
        return (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-400" />
                Recent GitHub Activity
            </h3>
            <div className="space-y-3">
                {events.slice(0, 5).map((event) => (
                    <div
                        key={event.id}
                        className="flex items-start gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        <GitCommit className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                        <div className="flex-1 min-w-0">
                            <p className="truncate">
                                {event.type === "PushEvent"
                                    ? event.payload.commits?.[0]?.message || "Pushed commits"
                                    : event.type.replace("Event", "")}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">{event.repo.name}</p>
                        </div>
                        <span className="text-xs text-zinc-600 whitespace-nowrap">
                            {new Date(event.created_at).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
