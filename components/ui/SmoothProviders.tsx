"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

declare global {
  interface Window {
    __portfolioLenis?: Lenis;
    __isProgrammaticScroll?: boolean;
  }
}

function MinimalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || typeof window === "undefined") return;

    let isPressed = false;
    let lastEvent: PointerEvent | null = null;

    const updateCursor = () => {
      if (!lastEvent) return;
      const scale = isPressed ? 0.75 : 1;
      cursor.animate(
        {
          transform: `translate3d(${lastEvent.clientX - 14}px, ${lastEvent.clientY - 14}px, 0) scale(${scale})`,
          opacity: 1,
        },
        { duration: 450, fill: "forwards", easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      lastEvent = event;
      updateCursor();
    };

    const onPointerDown = () => {
      isPressed = true;
      updateCursor();
    };

    const onPointerUp = () => {
      isPressed = false;
      updateCursor();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-7 w-7 rounded-full border border-[var(--primary)] opacity-0 mix-blend-screen shadow-[0_0_18px_color-mix(in_srgb,var(--primary)_38%,transparent)] md:block"
      aria-hidden="true"
    />
  );
}

export default function SmoothProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    const raf = (time: number) => lenis.raf(time * 1000);

    // Patch lenis.scrollTo to manage a global programmatic scroll flag
    const originalScrollTo = lenis.scrollTo.bind(lenis);
    type ScrollToParams = Parameters<Lenis["scrollTo"]>;

    lenis.scrollTo = (target: ScrollToParams[0], options?: ScrollToParams[1]) => {
      window.__isProgrammaticScroll = true;

      // Setup safety timeout
      const timeoutId = setTimeout(() => {
        window.__isProgrammaticScroll = false;
      }, 1500);

      const originalOnComplete = options?.onComplete;
      const patchedOptions = {
        ...options,
        onComplete: () => {
          clearTimeout(timeoutId);
          window.__isProgrammaticScroll = false;
          if (originalOnComplete) {
            originalOnComplete(lenis);
          }
        },
      };

      originalScrollTo(target, patchedOptions);
    };

    window.__portfolioLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__portfolioLenis;
      delete window.__isProgrammaticScroll;
    };
  }, []);

  return (
    <>
      {children}
      <MinimalCursor />
    </>
  );
}
