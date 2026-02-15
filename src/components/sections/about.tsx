import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const AboutSection = () => {
  return (
    <SectionWrapper id="about" className="max-w-4xl mx-auto py-20 relative z-10">
      <SectionHeader id="about" title="About Me" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Glass Card 1: Bio */}
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors duration-300 group">
          <h3 className="text-xl font-bold mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">Who I Am</h3>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              I am a <span className="text-white font-medium">BSc in Data Science student</span> at Atharva Institute, driven by the potential of
              <span className="text-purple-400"> Artificial Intelligence</span> and
              <span className="text-emerald-400"> Machine Learning</span>.
            </p>
            <p>
              Passionate about bridging <span className="text-white italic">complex models</span> with
              <span className="text-white italic"> interactive web experiences</span>. I have hands-on experience building innovative AI projects like
              <span className="text-blue-400"> NOVA</span> (Voice Assistant) and <span className="text-blue-400"> NEURA</span> (AI Builder).
            </p>
          </div>
        </div>

        {/* Glass Card 2: Technical Focus */}
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors duration-300 group">
          <h3 className="text-xl font-bold mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">Core Focus</h3>
          <ul className="space-y-3">
            {[
              { label: "Computer Vision", color: "bg-blue-500" },
              { label: "NLP Systems", color: "bg-purple-500" },
              { label: "Data Engineering", color: "bg-emerald-500" },
              { label: "Scalable Deployment", color: "bg-orange-500" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-zinc-300 group/item hover:text-white transition-colors">
                <span className={`w-2 h-2 rounded-full ${item.color} group-hover/item:scale-150 transition-transform`} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
