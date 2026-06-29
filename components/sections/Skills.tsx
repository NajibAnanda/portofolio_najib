"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const skills = [
  { name: "JavaScript", slug: "javascript", color: "f7df1e" },
  { name: "React", slug: "react", color: "61dafb" },
  { name: "Next.js", slug: "nextdotjs", color: "ffffff" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "38bdf8" },
  { name: "CSS", slug: "css", color: "663399" },
  { name: "PHP", logoSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Laravel", slug: "laravel", color: "ff2d20" },
  { name: "Python", logoSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

function SkillTile({ name, slug, color, logoSrc }: { name: string; slug?: string; color?: string; logoSrc?: string }) {
  const imageSrc = logoSrc ?? `https://cdn.simpleicons.org/${slug}/${color}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/70 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[var(--primary)]">
      <div className="relative flex items-center gap-4">
        <span className="grid size-12 place-items-center rounded-xl border border-[var(--border)] bg-[var(--muted)] transition-colors duration-300 group-hover:border-[var(--primary)]">
          <img
            src={imageSrc}
            alt={`${name} logo`}
            loading="lazy"
            className="size-6 object-contain"
          />
        </span>
        <span className="text-base font-semibold tracking-[-0.03em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--primary)] md:text-lg">{name}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell scroll-mt-24 pb-14 pt-4 md:scroll-mt-28 md:pb-16 md:pt-6">
      <SectionHeading title="SKILLS." className="mb-12" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-60px" }}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
      >
        {skills.map((skill) => (
          <motion.div key={skill.name} variants={itemVariants}>
            <SkillTile {...skill} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
