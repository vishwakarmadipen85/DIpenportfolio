import { EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center min-h-[120vh] py-20 z-10"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="Experience"
          desc="My professional journey."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Connector Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden md:block -translate-x-1/2" />

          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative">
              <ExperienceCard experience={exp} index={index} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="group relative bg-zinc-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl hover:border-white/20 hover:bg-zinc-900/60 transition-all duration-300">

        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl -z-10" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              {experience.title}
            </h3>
            <div className="text-lg font-medium text-zinc-400">
              {experience.company}
            </div>
          </div>
          <Badge variant="secondary" className="w-fit font-mono text-xs font-normal bg-blue-500/10 text-blue-300 border-blue-500/20 px-3 py-1">
            {experience.startDate} - {experience.endDate}
          </Badge>
        </div>

        <ul className="space-y-3 mb-6">
          {experience.description.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
              <span className="mt-1.5 min-w-[6px] h-1.5 rounded-full bg-blue-500/50" />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {experience.skills.map((skillName) => {
            const skill = SKILLS[skillName as SkillNames];
            return (
              <Badge
                key={skillName}
                variant="outline"
                className="gap-2 text-xs font-normal bg-black/20 hover:bg-white/10 transition-colors border-white/10 text-zinc-400"
              >
                <img
                  src={skill.icon}
                  alt={skill.label}
                  className="w-3.5 h-3.5 object-contain opacity-80"
                />
                {skill.label}
              </Badge>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
