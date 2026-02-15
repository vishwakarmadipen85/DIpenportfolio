"use client";

import { useEffect, useState } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    life: number;
}

export const CursorTrail = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newParticle: Particle = {
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 5 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                life: 1,
            };

            setParticles((prev) => [...prev.slice(-20), newParticle]);
        };

        window.addEventListener("mousemove", handleMouseMove);

        const interval = setInterval(() => {
            setParticles((prev) =>
                prev
                    .map((p) => ({
                        ...p,
                        x: p.x + p.speedX,
                        y: p.y + p.speedY,
                        life: p.life - 0.02,
                    }))
                    .filter((p) => p.life > 0)
            );
        }, 16);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99998]">
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        opacity: particle.life,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}
        </div>
    );
};
