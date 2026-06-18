"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  title: string;
  className?: string;
};

export default function SectionHeading({ title, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-4 ${className}`}
    >
      <h2 className="m-0 shrink-0 whitespace-nowrap bg-[linear-gradient(90deg,var(--foreground)_60%,var(--primary)_100%)] bg-clip-text text-[42px] font-bold uppercase leading-none tracking-[-1.5px] text-transparent">
        {title}
      </h2>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="h-px flex-1 bg-[linear-gradient(90deg,var(--border),transparent)]"
        aria-hidden="true"
      />
    </motion.div>
  );
}
