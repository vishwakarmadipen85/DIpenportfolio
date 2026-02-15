import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Brain, Cpu, Eye, Lock, Network, Search, Server, Zap } from "lucide-react";

const researchAreas = [
  {
    title: "Applied Computer Vision",
    icon: Eye,
    color: "text-blue-400",
    desc: "Real-time object detection and segmentation in dynamic environments.",
  },
  {
    title: "Model Optimization",
    icon: Zap,
    color: "text-yellow-400",
    desc: "Quantization and pruning for efficient edge deployment.",
  },
  {
    title: "Real-Time AI",
    icon: Cpu,
    color: "text-red-400",
    desc: "Low-latency inference systems for interactive applications.",
  },
  {
    title: "Secure Architectures",
    icon: Lock,
    color: "text-green-400",
    desc: "Adversarial robustness and privacy-preserving ML pipelines.",
  },
  {
    title: "Intelligent Automation",
    icon: Network,
    color: "text-purple-400",
    desc: "Agentic workflows for complex task orchestration.",
  },
];

const currentExploration = [
  {
    title: "Transfer Learning",
    icon: Brain,
    desc: "Improving adaptability in few-shot scenarios.",
  },
  {
    title: "Model Evaluation",
    icon: Search,
    desc: "Robust metrics beyond accuracy for real-world performance.",
  },
  {
    title: "MLOps Workflows",
    icon: Server,
    desc: "Streamlined deployment/monitoring for scalable AI.",
  },
];

const ResearchSection = () => {
  return (
    <SectionWrapper id="research" className="max-w-6xl mx-auto py-20">
      <SectionHeader
        id="research"
        title="Research & Interests"
        desc="Pushing the boundaries of intelligent systems."
      />

      {/* Core Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {researchAreas.map((area, idx) => (
          <div
            key={idx}
            className="group relative bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-zinc-900/60 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md -z-10" />

            <div className="flex items-center gap-4 mb-4">
              <div className={cn("p-3 rounded-lg bg-white/5", area.color)}>
                <area.icon size={24} />
              </div>
              <h3 className="font-bold text-lg text-zinc-100">{area.title}</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {area.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Currently Exploring */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold text-center mb-10 text-zinc-100">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Currently Exploring
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentExploration.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
            >
              <item.icon className="text-zinc-500 mb-4" size={20} />
              <h4 className="font-semibold text-zinc-200 mb-2">{item.title}</h4>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ResearchSection;
