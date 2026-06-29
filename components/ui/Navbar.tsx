"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Menu, X } from "lucide-react";
import Lenis from "lenis";

declare global {
  interface Window {
    __portfolioLenis?: Lenis;
    __isProgrammaticScroll?: boolean;
  }
}

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function scrollToTarget(href: string, onComplete?: () => void) {
  if (typeof window === "undefined") return;
  const lenis = window.__portfolioLenis;
  if (lenis) {
    lenis.scrollTo(href, { onComplete });
    return;
  }
  
  // Fallback for native smooth scroll
  window.__isProgrammaticScroll = true;
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    window.__isProgrammaticScroll = false;
    if (onComplete) onComplete();
  }, 1000);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const visible = true;
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLinkClick = (href: string) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }
    isClickScrolling.current = true;
    setActiveLink(href);
    
    // Safety fallback timeout
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 2000);

    scrollToTarget(href, () => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      isClickScrolling.current = false;
    });
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 100);

      if (isClickScrolling.current || (typeof window !== "undefined" && window.__isProgrammaticScroll)) return;

      const activationLine = currentY + Math.min(window.innerHeight * 0.38, 360);
      const currentSection = links.findLast((link) => {
        const section = document.querySelector(link.href);
        if (!section) return false;
        const sectionTop = section.getBoundingClientRect().top + currentY;
        return activationLine >= sectionTop;
      });

      setActiveLink(currentSection?.href ?? "#hero");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleScrollClose = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", handleScrollClose, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [open]);

  return (
    <motion.header
      initial={{ y: "-200%", opacity: 0 }}
      animate={{ y: visible ? "0%" : "-200%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 md:top-5"
    >
      <nav
        className={`pointer-events-auto mx-auto hidden grid-cols-[1fr_auto_1fr] items-center overflow-hidden rounded-full border transition-all duration-300 lg:grid ${
          scrolled
            ? "w-[860px] p-2 border-[var(--border)] bg-[color-mix(in_srgb,var(--navbar-background)_80%,transparent)] shadow-[0_16px_48px_color-mix(in_srgb,var(--background)_60%,transparent)] backdrop-blur-xl"
            : "w-[800px] p-1.5 border-[color-mix(in_srgb,var(--border)_62%,transparent)] bg-[var(--card)]/18 backdrop-blur-md"
        }`}
      >
        <button
          onClick={() => handleLinkClick("#hero")}
          className="shrink-0 justify-self-start px-4 py-1 text-[1.38rem] font-semibold uppercase leading-none tracking-[-0.06em] text-[var(--foreground)]"
          aria-label="Go to hero section"
        >
          <span className="bg-[linear-gradient(90deg,var(--secondary-foreground)_0%,var(--accent-foreground)_45%,var(--primary)_100%)] bg-clip-text text-transparent">
            Najib
          </span>
        </button>

        <div
          className={`flex w-full items-center justify-center overflow-hidden px-2 transition-all duration-300 ${
            scrolled ? "gap-6" : "gap-5"
          }`}
        >
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className={`relative w-[5.25rem] rounded-full text-center text-sm transition-all duration-300 hover:bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] hover:text-[var(--foreground)] hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--secondary-foreground)_10%,transparent)] ${
                scrolled ? "py-[10px] px-[8px]" : "py-[9px] px-[6px]"
              } ${
                activeLink === link.href ? "text-[var(--secondary-foreground)]" : "text-[var(--muted-foreground)]"
              }`}
            >
              {activeLink === link.href ? (
                <motion.span
                  layoutId="navbar-active-pill"
                  transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.75 }}
                  className="absolute inset-0 rounded-full border border-[color-mix(in_srgb,var(--secondary-foreground)_20%,transparent)] bg-[color-mix(in_srgb,var(--primary)_28%,var(--card))] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_12%,transparent),0_10px_24px_color-mix(in_srgb,var(--primary)_18%,transparent)]"
                />
              ) : null}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleLinkClick("#contact")}
          className={`inline-flex items-center gap-2 justify-self-end rounded-full bg-[var(--primary)] text-sm font-semibold text-[var(--background)] transition-all duration-300 hover:bg-[var(--primary-hover)] ${
            scrolled ? "py-[9px] px-[18px]" : "py-[8px] px-[16px]"
          }`}
        >
          <span>Hire me</span>
          <BriefcaseBusiness aria-hidden="true" size={16} strokeWidth={2.3} />
        </button>
      </nav>

      <nav
        className={`pointer-events-auto mx-auto flex h-12 max-w-md items-center justify-between rounded-full border px-3 transition-colors duration-300 lg:hidden ${
          scrolled
            ? "border-[var(--border)] bg-[color-mix(in_srgb,var(--navbar-background)_80%,transparent)] backdrop-blur-xl"
            : "border-[color-mix(in_srgb,var(--border)_62%,transparent)] bg-[var(--card)]/20 backdrop-blur-md"
        }`}
      >
        <button
          onClick={() => handleLinkClick("#hero")}
          className="px-2 py-1 text-xl font-semibold uppercase leading-none tracking-[-0.06em]"
          aria-label="Go to hero section"
        >
          <span className="bg-[linear-gradient(90deg,var(--secondary-foreground)_0%,var(--accent-foreground)_45%,var(--primary)_100%)] bg-clip-text text-transparent">
            Najib
          </span>
        </button>

        <button
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex h-10 w-10 items-center justify-center transition-colors hover:text-[var(--primary)] ${
            open ? "text-[var(--primary)]" : "text-[var(--foreground)]"
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mx-auto mt-3 max-w-md rounded-3xl border border-[var(--border)] bg-[var(--sidebar-background)]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {links.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  handleLinkClick(link.href);
                  setOpen(false);
                }}
                className={`block w-full rounded-2xl px-4 py-3 text-left transition-[color,background-color,box-shadow] duration-300 hover:bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] hover:text-[var(--foreground)] hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--secondary-foreground)_10%,transparent)] ${
                  activeLink === link.href ? "bg-[var(--accent)] text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                }`}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Separator and Hire me Button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 }}
              className="mt-2.5 pt-2.5 border-t border-[var(--border)]"
            >
              <button
                onClick={() => {
                  handleLinkClick("#contact");
                  setOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] py-3 text-sm font-semibold text-[var(--background)] transition-all duration-300 hover:bg-[var(--primary-hover)]"
              >
                <span>Hire me</span>
                <BriefcaseBusiness aria-hidden="true" size={16} strokeWidth={2.3} />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
