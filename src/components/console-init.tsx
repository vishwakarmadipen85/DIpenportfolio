"use client";

import { useEffect } from "react";
import { initConsoleArt } from "@/lib/console-art";

export const ConsoleInit = () => {
    useEffect(() => {
        initConsoleArt();
    }, []);

    return null;
};
