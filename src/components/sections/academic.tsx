import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const AcademicSection = () => {
  return (
    <SectionWrapper id="experience" className="max-w-6xl mx-auto py-20">
      <SectionHeader id="academic" title="Academic Background" />

      <div className="grid grid-cols-1 gap-6 mt-12">
        {/* Education Card */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-xl hover:bg-zinc-900/80 transition-all hover:-translate-y-1 duration-300 relative group">
          <div className="absolute top-0 right-0 p-4 opacity-50 text-6xl font-black text-white/5 pointer-events-none group-hover:text-white/10 transition-colors">
            EDU
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">B.Sc in Data Science</h3>
          <p className="text-blue-400 font-medium text-lg mb-1">
            Atharva Institute of Hotel Management And Catering Technology, Mumbai
          </p>
          <div className="flex flex-wrap gap-4 text-zinc-400 text-sm mb-6">
            <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">
              April 2024 - Present
            </span>
            <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-emerald-400">
              CGPA: 8.5/10
            </span>
          </div>

          <h4 className="text-lg font-semibold text-zinc-200 mb-3 border-b border-white/10 pb-2 inline-block">
            Key Coursework
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Data Analysis & Visualization
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Machine Learning Principles
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Advanced Python Programming
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Database Management Systems
            </li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AcademicSection;
