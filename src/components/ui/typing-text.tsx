"use client";

import { TypeAnimation } from 'react-type-animation';

export const TypingText = () => {
    return (
        <TypeAnimation
            sequence={[
                'AI Developer',
                2000,
                'Full-Stack Engineer',
                2000,
                'Machine Learning Enthusiast',
                2000,
                'Problem Solver',
                2000,
            ]}
            wrapper="span"
            speed={50}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            repeat={Infinity}
        />
    );
};
