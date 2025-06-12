import { Cloud, Code, Database, Figma, GitBranch, Server, Smartphone, TestTube, Workflow } from "lucide-react";
import { motion } from "framer-motion"
// import { SkillCardProps } from "@/app/page";

// Fixing the SkillCard component's icon mapping logic
export const iconMap = {
  Code,
  Smartphone,
  Server,
  Database,
  GitBranch,
  Workflow,
  TestTube,
  Figma,
  Cloud,
} as const;

export type IconMap = typeof iconMap;
export type SkillCardProps = {
  skill: {
    name: string;
    icon: keyof IconMap;
    level: number;
  };
};

export function SkillCard() {

  const IconComponent = iconMap[skill.icon] || Code;

  return (
    <motion.div
      className="flex flex-col items-center p-4 rounded-lg border border-teal/20 bg-dark-accent text-card-foreground shadow-sm"
      whileHover={{ y: -5, boxShadow: "0 0 15px rgba(46, 149, 153, 0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconComponent className="h-8 w-8 mb-2 text-teal animate-pulse" />
      <h4 className="font-medium text-sm">{skill.name}</h4>
      <div className="w-full bg-muted rounded-full h-1.5 mt-2">
        <div className="skill-progress-bar h-1.5 rounded-full" style={{ width: `${skill.level}%` }} />
      </div>
    </motion.div>
  );
}