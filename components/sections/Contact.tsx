"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface MenuItem {
  label: string;
  value: string;
  href: string;
  isEmail?: boolean;
}

const contactItems: MenuItem[] = [
  {
    label: "Email",
    value: "najibanandasaputra@gmail.com",
    href: "mailto:najibanandasaputra@gmail.com",
    isEmail: true,
  },
  {
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/higmatul-najib-ananda-saputra-735757248",
    href: "https://www.linkedin.com/in/higmatul-najib-ananda-saputra-735757248",
  },
  {
    label: "GitHub",
    value: "https://github.com/NajibAnanda",
    href: "https://github.com/NajibAnanda",
  },
  {
    label: "Instagram",
    value: "https://www.instagram.com/njbananda?igsh=eXRxa292YmMzcWl2",
    href: "https://www.instagram.com/njbananda?igsh=eXRxa292YmMzcWl2",
  },
];

function PlatformIcon({ label, size = 20 }: { label: string; size?: number }) {
  const className = "inline-block";

  switch (label.toLowerCase()) {
    case "github":
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.76.46 3.42 1.34 4.96L2 22l5.16-1.34c1.48.81 3.16 1.34 4.84 1.34C17.52 22 22 17.52 22 12.004 22 6.48 17.52 2 12.004 2zM12 20.36c-1.52 0-3.01-.4-4.32-1.18l-.31-.18-3.21.84.85-3.13-.2-.32c-.86-1.37-1.31-2.96-1.31-4.59 0-4.63 3.77-8.41 8.41-8.41s8.41 3.77 8.41 8.41-3.77 8.41-8.41 8.41zm4.61-6.31c-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.26-.66.82-.81.99-.15.17-.3.2-.55.07-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.12-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.5-.41-.42-.56-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.03 2.63c.13.17 1.79 2.73 4.33 3.83.6.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.49-.61 1.7-1.2.21-.58.21-1.09.15-1.2-.06-.11-.22-.17-.47-.3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "email":
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

function FlowingMenuItem({
  item,
  isFirst,
}: {
  item: MenuItem;
  isFirst: boolean;
}) {
  const content = (
    <div className="flex w-full items-center justify-between py-3 md:py-3.5 transition-colors duration-300">
      {/* Left side: Icon wrapper + Label */}
      <div className="flex items-center">
        {/* Dynamic slide-in logo wrapper */}
        <span className="w-0 overflow-hidden opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:w-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-3 text-white/40 group-hover:text-[var(--primary)] flex items-center justify-center shrink-0">
          <PlatformIcon label={item.label} size={20} />
        </span>

        {/* Label */}
        <span className="text-2xl md:text-3xl font-semibold text-[var(--foreground)] transition-all duration-300 ease-out group-hover:text-[var(--primary)] group-hover:translate-x-0.5">
          {item.label}
        </span>
      </div>

      {/* Arrow on the right */}
      <span className="text-[var(--primary)] transition-transform duration-300 ease-out group-hover:translate-x-1">
        <ArrowRight size={24} strokeWidth={2.3} />
      </span>
    </div>
  );

  const itemClassName = `group relative flex items-center justify-between overflow-hidden text-left bg-transparent focus:outline-none transition-colors duration-300 hover:bg-white/[0.005] w-full cursor-pointer border-b border-white/10 group-hover:border-b-[var(--primary)]/30 ${
    isFirst ? "border-t border-t-white/10 group-hover:border-t-[var(--primary)]/30" : ""
  }`;

  return (
    <a
      href={item.href}
      target={item.isEmail ? undefined : "_blank"}
      rel={item.isEmail ? undefined : "noopener noreferrer"}
      className={itemClassName}
    >
      {content}
    </a>
  );
}

const leftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const rightContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const rightItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="section-shell scroll-mt-24 pb-14 pt-4 md:scroll-mt-28 md:pb-16 md:pt-6">
      <SectionHeading title="CONTACT." className="mb-12" />

      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
        {/* Left Column */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="pt-0"
        >
          <h3 className="-mt-[3px] mb-5 max-w-xl text-3xl font-semibold leading-tight text-[var(--foreground)] md:-mt-[5px] md:text-4xl">
            Punya Ide? <span className="text-[var(--primary)]">Hubungi Saya.</span>
          </h3>

          <p className="max-w-lg text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
            Jika memiliki ide, proyek, atau peluang kerja sama, saya siap berdiskusi untuk membantu 
            mengembangkannya menjadi website, aplikasi, atau sistem IoT yang fungsional dan modern.
          </p>
        </motion.div>

        {/* Right Column: Contact List */}
        <motion.div
          variants={rightContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="w-full max-w-xl"
        >
          <div className="flex flex-col">
            {contactItems.map((item, index) => (
              <motion.div key={item.label} variants={rightItemVariants}>
                <FlowingMenuItem
                  item={item}
                  isFirst={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}