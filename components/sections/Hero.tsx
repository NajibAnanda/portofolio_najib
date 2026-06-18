"use client";

import { ArrowDownRight, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import BlurText from "@/components/ui/BlurText";

const beamColumns = [
  { left: "4%", delay: "-5.8s", duration: "12.8s", opacity: 0.18, desktopOnly: true },
  { left: "12%", delay: "-3.4s", duration: "10.6s", opacity: 0.28 },
  { left: "20%", delay: "-9.4s", duration: "11.6s", opacity: 0.2, desktopOnly: true },
  { left: "28%", delay: "-7.2s", duration: "12.4s", opacity: 0.34 },
  { left: "37%", delay: "-4.2s", duration: "10.9s", opacity: 0.28, desktopOnly: true },
  { left: "47%", delay: "-2.1s", duration: "9.6s", opacity: 0.64 },
  { left: "61%", delay: "-8.9s", duration: "11.2s", opacity: 0.48 },
  { left: "70%", delay: "-1.6s", duration: "10.8s", opacity: 0.26, desktopOnly: true },
  { left: "77%", delay: "-4.6s", duration: "13s", opacity: 0.32 },
  { left: "85%", delay: "-7.8s", duration: "11.4s", opacity: 0.22, desktopOnly: true },
  { left: "90%", delay: "-10.1s", duration: "11.8s", opacity: 0.24 },
  { left: "96%", delay: "-6.2s", duration: "12.6s", opacity: 0.16, desktopOnly: true },
];

function Beams() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--background)]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_49%_28%,color-mix(in_srgb,var(--primary)_3.5%,transparent),transparent_34rem)]" />

      <div className="absolute inset-0 overflow-hidden">
        {beamColumns.map((beam, index) => (
          <span
            key={index}
            className={`beam-track absolute inset-y-0 w-px ${beam.desktopOnly ? "hidden md:block" : ""}`}
            style={{
              left: beam.left,
              opacity: beam.opacity,
            }}
          >
            <span
              className="beam-ray absolute left-0 top-0 w-px"
              style={{
                animationDelay: beam.delay,
                animationDuration: beam.duration,
              }}
            />
          </span>
        ))}
      </div>

      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(color-mix(in_srgb,var(--foreground)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_7%,transparent)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="beam-vignette absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_55%,var(--background)_100%)]" />

      <style jsx global>{`
        .beam-ray {
          height: clamp(10rem, 30vh, 20rem);
          background: linear-gradient(
            180deg,
            transparent 0%,
            color-mix(in srgb, var(--primary) 7%, transparent) 14%,
            color-mix(in srgb, var(--primary) 28%, transparent) 55%,
            color-mix(in srgb, var(--secondary-foreground) 78%, transparent) 91%,
            transparent 100%
          );
          box-shadow:
            0 0 7px color-mix(in srgb, var(--primary) 30%, transparent),
            0 0 18px color-mix(in srgb, var(--primary) 12%, transparent);
          animation-name: beam-fall;
          animation-timing-function: cubic-bezier(0.38, 0, 0.62, 1);
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        .beam-ray::before {
          position: absolute;
          inset-block: 0;
          left: 50%;
          width: clamp(0.6rem, 1.6vw, 1.5rem);
          content: "";
          background: linear-gradient(
            180deg,
            transparent,
            color-mix(in srgb, var(--primary) 18%, transparent) 68%,
            transparent
          );
          filter: blur(10px);
          transform: translateX(-50%);
        }

        .beam-vignette {
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--background) 78%, transparent) 0%,
            transparent 38%,
            transparent 68%,
            color-mix(in srgb, var(--background) 70%, transparent) 100%
          );
        }

        @media (min-width: 768px) {
          .beam-vignette {
            background: linear-gradient(
              90deg,
              color-mix(in srgb, var(--background) 44%, transparent) 0%,
              transparent 16%,
              transparent 84%,
              color-mix(in srgb, var(--background) 44%, transparent) 100%
            );
          }
        }

        @keyframes beam-fall {
          0% {
            opacity: 0;
            transform: translate3d(0, -110%, 0);
          }
          8% {
            opacity: 0.4;
          }
          14% {
            opacity: 1;
          }
          76% {
            opacity: 0.82;
          }
          92% {
            opacity: 0.24;
          }
          100% {
            opacity: 0;
            transform: translate3d(0, calc(100vh + 110%), 0);
          }
        }
      `}</style>
    </div>
  );
}

function UnderlineRoleTicker({ delay = 1.1 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ originY: 0.5 }}
      className="relative mx-auto mt-5 w-[min(34rem,calc(100vw-2rem))] overflow-hidden py-3 text-[var(--secondary-foreground)] md:mt-4 md:w-[min(40rem,calc(100vw-3rem))]"
    >
      <div className="absolute left-0 top-0 h-px w-full bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-70" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(90deg,transparent,var(--border),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-[linear-gradient(90deg,var(--background),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-[linear-gradient(270deg,var(--background),transparent)]" />

      <div className="role-track flex w-max items-center gap-5 text-xs font-semibold uppercase tracking-[0.34em] md:gap-6 md:text-sm">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="inline-flex items-center gap-5 whitespace-nowrap md:gap-6">
            <span>Frontend & Backend Developer</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--secondary-foreground)] opacity-90" aria-hidden="true" />
          </span>
        ))}
      </div>
      <style>{`
        .role-track {
          animation: role-scroll 18s linear infinite;
        }

        @keyframes role-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <>
      <section id="hero" className="relative min-h-screen overflow-hidden pt-28 noise-bg md:pt-24">
        <Beams />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-[min(100%,calc(100vw-1.5rem))] items-center justify-center pb-12 sm:w-[min(100%,calc(100vw-3rem))] md:min-h-[calc(100vh-6rem)] md:pb-10">
          <div className="relative mx-auto flex w-full max-w-[110rem] flex-col items-center text-center">
            <h1 className="px-2 text-[clamp(1.8rem,9.5vw,4.8rem)] font-semibold uppercase leading-[0.98] md:leading-[0.86] tracking-[-0.09em] text-[var(--foreground)] md:px-4 md:text-[clamp(4.2rem,8.5vw,10.5rem)] md:tracking-[-0.095em]">
              <span className="block whitespace-nowrap">
                <BlurText text="Higmatul Najib" delay={0.15} className="!flex-nowrap !whitespace-nowrap" />
              </span>
              <span className="block whitespace-nowrap px-1 md:px-2 pb-5">
                <BlurText
                  text="Ananda Saputra"
                  delay={0.45}
                  className="!flex-nowrap !whitespace-nowrap"
                  childClassName="bg-[linear-gradient(90deg,var(--foreground)_0%,var(--primary)_48%,var(--secondary-foreground)_100%)] bg-clip-text text-transparent pr-[0.06em]"
                />
              </span>
            </h1>

            <UnderlineRoleTicker delay={0.8} />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.15, ease: [0.16, 1, 0.3, 1] as const }}
              className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row md:mt-7"
            >
              <button
                onClick={() => (window as Window & { __portfolioLenis?: { scrollTo: (target: string) => void } }).__portfolioLenis?.scrollTo("#projects")}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-8 py-4 text-sm font-bold text-[var(--background)] shadow-[0_0_34px_color-mix(in_srgb,var(--primary)_26%,transparent)] transition-colors hover:bg-[var(--primary-hover)]"
              >
                <span>Lihat Proyek</span>
                <span className="relative h-[17px] w-[17px] overflow-hidden" aria-hidden="true">
                  <ArrowDownRight
                    className="absolute inset-0 transition duration-300 group-hover:translate-x-4 group-hover:opacity-0"
                    size={17}
                    strokeWidth={2.4}
                  />
                  <ArrowRight
                    className="absolute inset-0 -translate-x-4 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    size={17}
                    strokeWidth={2.4}
                  />
                </span>
              </button>
              <a
                href="/assets/cv higmatul najib ananda saputra.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)]/70 px-8 py-4 text-center text-sm font-bold text-[var(--foreground)] backdrop-blur-xl transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <span>Download CV</span>
                <Download aria-hidden="true" size={17} strokeWidth={2.3} />
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
