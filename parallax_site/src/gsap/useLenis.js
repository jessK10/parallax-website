// src/gsap/useLenis.js
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis + GSAP smooth scrolling (buttery)
 * - Respects prefers-reduced-motion
 * - Keeps ScrollTrigger in sync
 * - Uses GSAP ticker for stable timing
 */
export default function useLenis(options = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion users
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      // nice defaults — tweak to taste:
      duration: 1.1,                               // 0.9–1.4 is a good range
      easing: (t) => 1 - Math.pow(1 - t, 3),       // cubic-out
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      ...options,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    // Drive Lenis from GSAP's ticker (ticker time is in seconds)
    const update = (time) => {
      lenis.raf(time * 1000); // Lenis expects ms
    };
    gsap.ticker.add(update);

    // Refresh after everything is ready
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [options]);

  return lenisRef; // in case you want to access the instance elsewhere
}
