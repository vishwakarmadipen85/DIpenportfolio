import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS, SkillNames } from "@/data/constants";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/use-sound";

const SkillsSection = () => {
  const playSound = useSound("/assets/keycap-sounds/press.mp3");

  const categories = [
    {
      title: "Programming",
      skills: [SkillNames.JS, SkillNames.TS, SkillNames.PYTHON, SkillNames.CPP],
      // skills: [SkillNames.TS, SkillNames.JS, SkillNames.HTML, SkillNames.CSS] // Reverting to original plan + Python/CPP if added
    },
    {
      title: "Frameworks & Libs",
      skills: [SkillNames.REACT, SkillNames.NEXTJS, SkillNames.VUE, SkillNames.TAILWIND, SkillNames.NODEJS, SkillNames.EXPRESS]
    },
    {
      title: "Tools & Platforms",
      skills: [SkillNames.DOCKER, SkillNames.AWS, SkillNames.GIT, SkillNames.LINUX, SkillNames.MONGODB, SkillNames.POSTGRES]
    }
  ];

  return (
    <SectionWrapper id="skills" className="w-full py-20">
      <SectionHeader id="skills" title="Tech Stack" desc="The arsenal I use to conquer the web." />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-center text-zinc-200 border-b border-white/10 pb-4 mb-2">
              {cat.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {cat.skills.map((skillKey) => {
                const skill = SKILLS[skillKey as SkillNames];
                if (!skill) return null;
                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => playSound()}
                    className={cn(
                      "group relative flex items-center gap-2 px-4 py-2 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-full",
                      "hover:border-white/20 hover:bg-zinc-800 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                    )}
                  >
                    <img src={skill.icon} alt={skill.label} className="w-5 h-5 object-contain" />
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100 transition-colors">
                      {skill.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
