import { useEffect, useState } from "react";

export const useSound = (url: string) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        setAudio(new Audio(url));
    }, [url]);

    const play = () => {
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    };

    return play;
};
