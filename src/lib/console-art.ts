export const initConsoleArt = () => {
    if (typeof window === "undefined") return;

    const styles = {
        title: "color: #3b82f6; font-size: 24px; font-weight: bold;",
        subtitle: "color: #8b5cf6; font-size: 16px;",
        text: "color: #10b981; font-size: 14px;",
        link: "color: #f59e0b; font-size: 14px; font-weight: bold;",
    };

    const art = `
  ██████╗ ██╗██████╗ ███████╗███╗   ██╗
  ██╔══██╗██║██╔══██╗██╔════╝████╗  ██║
  ██║  ██║██║██████╔╝█████╗  ██╔██╗ ██║
  ██║  ██║██║██╔═══╝ ██╔══╝  ██║╚██╗██║
  ██████╔╝██║██║     ███████╗██║ ╚████║
  ╚═════╝ ╚═╝╚═╝     ╚══════╝╚═╝  ╚═══╝
  `;

    console.log("%c" + art, styles.title);
    console.log("%c👋 Hey there, fellow developer!", styles.subtitle);
    console.log(
        "%c🚀 Welcome to my portfolio! I see you're curious about the code.",
        styles.text
    );
    console.log(
        "%c💼 I'm Dipen Vishwakarma - AI Developer & Full-Stack Engineer",
        styles.text
    );
    console.log("%c🔍 Interested in working together?", styles.text);
    console.log("%c📧 Reach out: vishwakarmadipen85@gmail.com", styles.link);
    console.log("%c⭐ Check out my GitHub for more cool projects!", styles.text);
    console.log(
        "%c🎯 Easter Egg: Try typing 'skills()' or 'projects()' in the console!",
        "color: #ec4899; font-size: 12px; font-style: italic;"
    );

    // Add interactive console commands
    (window as any).skills = () => {
        console.log(
            "%c🛠️ My Tech Stack:",
            "color: #3b82f6; font-size: 16px; font-weight: bold;"
        );
        console.table({
            Frontend: "React, Next.js, TypeScript, Tailwind CSS",
            Backend: "Node.js, Python, FastAPI",
            "AI/ML": "TensorFlow, PyTorch, OpenAI API",
            "3D": "Three.js, React Three Fiber",
            Database: "MongoDB, PostgreSQL, Redis",
        });
    };

    (window as any).projects = () => {
        console.log(
            "%c🚀 Featured Projects:",
            "color: #8b5cf6; font-size: 16px; font-weight: bold;"
        );
        console.table({
            NOVA: "AI Voice Assistant with 3D Holographic UI",
            NEURA: "Advanced AI Builder Platform",
            "This Portfolio": "3D Interactive Developer Showcase",
        });
    };

    (window as any).contact = () => {
        console.log(
            "%c📬 Let's Connect!",
            "color: #10b981; font-size: 16px; font-weight: bold;"
        );
        console.log("%cEmail: vishwakarmadipen85@gmail.com", styles.link);
        console.log("%cLocation: Mumbai, India", styles.text);
    };
};
