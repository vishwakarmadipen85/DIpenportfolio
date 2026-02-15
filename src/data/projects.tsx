import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ReactNode } from "react";
import {
  RiNextjsFill,
  RiNodejsFill,
  RiReactjsFill,
} from "react-icons/ri";
import {
  SiArduino,
  SiCplusplus,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiOpencv,
  SiPandas,
  SiPhp,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
} from "react-icons/si";

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  pytorch: {
    title: "PyTorch",
    bg: "black",
    fg: "white",
    icon: <SiPytorch />,
  },
  tensorflow: {
    title: "TensorFlow",
    bg: "black",
    fg: "white",
    icon: <SiTensorflow />,
  },
  opencv: {
    title: "OpenCV",
    bg: "black",
    fg: "white",
    icon: <SiOpencv />,
  },
  pandas: {
    title: "Pandas",
    bg: "black",
    fg: "white",
    icon: <SiPandas />,
  },
  scikit: {
    title: "Scikit-learn",
    bg: "black",
    fg: "white",
    icon: <SiScikitlearn />,
  },
  php: {
    title: "PHP",
    bg: "black",
    fg: "white",
    icon: <SiPhp />,
  },
  mysql: {
    title: "MySQL",
    bg: "black",
    fg: "white",
    icon: <SiMysql />,
  },
  arduino: {
    title: "Arduino",
    bg: "black",
    fg: "white",
    icon: <SiArduino />,
  },
  cpp: {
    title: "C++",
    bg: "black",
    fg: "white",
    icon: <SiCplusplus />,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "ai-medical-vision",
    category: "AI / Computer Vision",
    title: "AI Medical Vision System",
    src: "/assets/projects-screenshots/ai-medical/landing.svg",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.python, PROJECT_SKILLS.opencv],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.pytorch, PROJECT_SKILLS.tensorflow],
    },
    get content() {
      return (
        <div>
          <p className="font-mono">
            Architected a deep learning diagnostic engine utilizing transfer learning to
            decode dermatological patterns with high-precision classification.
          </p>
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">Automated skin disease screening matrix</li>
            <li className="font-mono">Neural network transfer optimization</li>
            <li className="font-mono">Visual explanation layer for interpretability</li>
          </ul>
        </div>
      );
    },
    live: "#",
    github: "https://github.com/vishwakarmadipen85",
  },
  {
    id: "nova-ai",
    category: "AI Assistant",
    title: "NOVA Voice Assistant",
    src: "/assets/projects-screenshots/aana-ai/landing.svg",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.python, PROJECT_SKILLS.react],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.js, PROJECT_SKILLS.opencv],
    },
    get content() {
      return (
        <div>
          <p className="font-mono">
            Developed a personal AI voice assistant using Python, OpenAI API,
            Google Cloud Speech-to-Text, and a 3D holographic UI.
          </p>
          <TypographyH3 className="my-4 mt-8">Capabilities</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">Real-time Speech recognition & synthesis</li>
            <li className="font-mono">OpenAI LLM Integration</li>
            <li className="font-mono">3D Holographic Interface (Three.js)</li>
          </ul>
        </div>
      );
    },
    live: "#",
    github: "https://github.com/vishwakarmadipen85/Aana-Voice-Assistant",
  },
  {
    id: "neura-ai",
    category: "AI Platform",
    title: "NEURA AI Builder",
    src: "/assets/projects-screenshots/financial-risk/landing.svg", // Using placeholder for now, or I can generate a new one
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.node],
    },
    get content() {
      return (
        <div>
          <p className="font-mono">
            Advanced AI builder integrating ChatGPT, DeepSeek, Claude AI, and Blackbox AI
            functionalities for project generation and real-time collaboration.
          </p>
          <TypographyH3 className="my-4 mt-8">Highlights</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">Multi-LLM Integration (GPT-4, Claude 3)</li>
            <li className="font-mono">Real-time Project Generation</li>
            <li className="font-mono">Collaborative AI Workspace</li>
          </ul>
        </div>
      );
    },
    live: "#",
    github: "https://github.com/vishwakarmadipen85",
  },
  {
    id: "stepper-shoes",
    category: "E-Commerce",
    title: "StepperShoes",
    src: "/assets/projects-screenshots/stepper/landing.svg",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.tailwind, PROJECT_SKILLS.react],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.mongo],
    },
    get content() {
      return (
        <div>
          <p className="font-mono">
            Deployed a full-stack e-commerce matrix with reactive UI state management,
            inventory tracking, and scalable database sharding.
          </p>
          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">Next.js & Tailwind CSS Interface</li>
            <li className="font-mono">MongoDB Distributed Database</li>
            <li className="font-mono">Adaptive Responsive Layouts</li>
          </ul>
        </div>
      );
    },
    live: "#",
    github: "https://github.com/vishwakarmadipen85/StepperShoes",
  },
  {
    id: "attendance-system",
    category: "IoT / Systems",
    title: "Attendance Management",
    src: "/assets/projects-screenshots/attendance/landing.svg",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.cpp, PROJECT_SKILLS.arduino],
      backend: [PROJECT_SKILLS.php, PROJECT_SKILLS.mysql],
    },
    get content() {
      return (
        <div>
          <p className="font-mono">
            Integrated hardware-software ecosystem for biometric/ID-based attendance tracking.
            Synchronizes physical inputs with digital reporting databases in real-time.
          </p>
          <TypographyH3 className="my-4 mt-8">Features</TypographyH3>
          <ul className="list-disc ml-6">
            <li className="font-mono">IoT Hardware Integration</li>
            <li className="font-mono">Mobile control interface</li>
            <li className="font-mono">Automated data synchronization</li>
          </ul>
        </div>
      );
    },
    live: "#",
    github: "https://github.com/vishwakarmadipen85/Attendence-Management-System",
  },
  {
    id: "food-ordering",
    category: "Web App",
    title: "Online Food Ordering",
    src: "/assets/projects-screenshots/food/landing.svg",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.php],
      backend: [PROJECT_SKILLS.php, PROJECT_SKILLS.mysql],
    },
    get content() {
      return (
        <div>
          <p className="font-mono">
            A comprehensive transactional system for food services.
            Orchestrates menu data, order processing, and user authentication protocols.
          </p>
        </div>
      );
    },
    live: "#",
    github: "https://github.com/vishwakarmadipen85/Online-Food-Ordering-System-PHP",
  },
];

export default projects;
