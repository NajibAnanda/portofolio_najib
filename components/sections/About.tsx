"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Lanyard from "@/components/ui/Lanyard";
import { AnimatePresence, motion } from "framer-motion";

const rotatingWords = ["antarmuka web", "sistem backend", "solusi IoT"];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const paragraph1Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.008,
      delayChildren: 0.3,
    },
  },
};

const paragraph2Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.008,
      delayChildren: 1.82,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const mobileLetterVariants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      duration: 0.1,
      delay: delay,
    },
  }),
};

const renderAnimatedTextMobile = (text: string, baseDelay: number, speed: number = 0.008) => {
  let charCount = 0;
  return text.split(" ").map((word, wordIndex, wordsArr) => {
    const chars = word.split("").map((char) => {
      const delay = baseDelay + charCount * speed;
      charCount++;
      return (
        <motion.span
          key={charCount}
          custom={delay}
          variants={mobileLetterVariants}
        >
          {char}
        </motion.span>
      );
    });

    const isLastWord = wordIndex === wordsArr.length - 1;
    if (!isLastWord) {
      const delay = baseDelay + charCount * speed;
      charCount++;
      return (
        <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
          {chars}
          <motion.span
            custom={delay}
            variants={mobileLetterVariants}
          >
            {" "}
          </motion.span>
        </span>
      );
    }

    return (
      <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
        {chars}
      </span>
    );
  });
};

const TypingDescription = React.memo(function TypingDescription() {
  return (
    <div className="text-base leading-7 text-[var(--muted-foreground)] md:text-lg md:leading-8">
      {/* Desktop version (Unchanged) */}
      <div className="hidden lg:block space-y-4">
        <motion.p
          variants={paragraph1Variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {"Saya Higmatul Najib Ananda Saputra, mahasiswa Teknik Informatika yang berfokus pada pengembangan web, baik dari sisi frontend maupun backend, serta memiliki minat dalam solusi berbasis IoT."
            .split("")
            .map((char, i) => (
              <motion.span key={i} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
        </motion.p>
        <motion.p
          variants={paragraph2Variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {"Dalam setiap proyek, saya berusaha membangun antarmuka web yang modern, responsif, dan mudah digunakan, serta sistem backend yang terstruktur dan fungsional. Saya juga tertarik mengembangkan solusi IoT berbasis mikrokontroler dan sensor yang dapat diterapkan untuk mendukung otomasi, monitoring, dan efisiensi dalam berbagai kebutuhan."
            .split("")
            .map((char, i) => (
              <motion.span key={i} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
        </motion.p>
      </div>

      {/* Mobile/Tablet version (Fixed word-wrapping) */}
      <div className="block lg:hidden space-y-4">
        <motion.p
          variants={paragraph1Variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {renderAnimatedTextMobile(
            "Saya Higmatul Najib Ananda Saputra, mahasiswa Teknik Informatika yang berfokus pada pengembangan web, baik dari sisi frontend maupun backend, serta memiliki minat dalam solusi berbasis IoT.",
            0.3
          )}
        </motion.p>
        <motion.p
          variants={paragraph2Variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {renderAnimatedTextMobile(
            "Dalam setiap proyek, saya berusaha membangun antarmuka web yang modern, responsif, dan mudah digunakan, serta sistem backend yang terstruktur dan fungsional. Saya juga tertarik mengembangkan solusi IoT berbasis mikrokontroler dan sensor yang dapat diterapkan untuk mendukung otomasi, monitoring, dan efisiensi dalam berbagai kebutuhan.",
            1.82
          )}
        </motion.p>
      </div>
    </div>
  );
});

export default function About() {
  const [wordIndex, setWordIndex] = useState(0);
  const [hasDropped, setHasDropped] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section-shell scroll-mt-24 pb-14 pt-4 md:scroll-mt-28 md:pb-16 md:pt-6">
      <SectionHeading title="ABOUT." className="mb-12" />

      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        onViewportEnter={() => setHasDropped(true)}
        className="about-lanyard-card relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_88%,var(--background))] p-4 shadow-[0_30px_100px_color-mix(in_srgb,var(--background)_72%,transparent)] md:p-5 lg:p-6"
      >
        <div className="about-lanyard-layer pointer-events-auto absolute inset-0 z-30 w-full">
          <Lanyard position={[0, 0, 20]} gravity={hasDropped ? [0, -55, 0] : [0, 0, 0]} fov={16.5} />
        </div>

        <div className="pointer-events-none relative z-40 grid gap-7 lg:grid-cols-[0.91fr_1.09fr] lg:items-center xl:grid-cols-[0.93fr_1.07fr]">
          <div className="relative h-[23rem] overflow-visible lg:h-auto lg:min-h-[25rem] xl:min-h-[27rem]">
          </div>

          <motion.div
            variants={textVariants}
            className="pointer-events-auto relative max-w-3xl select-text space-y-6 lg:pl-14 xl:pl-20"
          >
            <h2 className="max-w-none whitespace-nowrap text-[clamp(1.28rem,4.8vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.055em] text-[var(--foreground)]">
              <span className="mr-[0.18em] inline-block align-baseline">Saya membangun</span>
              <span className="relative inline-grid w-[14ch] overflow-hidden align-baseline text-[var(--primary)]">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    className="[grid-area:1/1] leading-[1.12]"
                    initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            <TypingDescription />

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
