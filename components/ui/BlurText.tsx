"use client";

import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  className?: string;
  childClassName?: string;
}

export default function BlurText({
  text,
  delay = 0.2,
  animateBy = "words",
  className = "",
  childClassName = "",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animateBy === "words" ? 0.08 : 0.02,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap ${className}`}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className={`inline-block ${childClassName}`}
          style={{ marginRight: animateBy === "words" ? "0.22em" : "0px" }}
        >
          {element === "" ? "\u00A0" : element}
        </motion.span>
      ))}
    </motion.span>
  );
}
