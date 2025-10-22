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
 * - Pauses when tab is hidden (optional)
 * - (Optional) scrollerProxy + helper scrollTo for anchors
 */
export default function useLenis(options = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined") return;

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

    // OPTIONAL: scrollerProxy (usually not needed when using ticker,
    // but can help if you do pinning-heavy setups or programmatic jumps)
    // ScrollTrigger.scrollerProxy(document.documentElement, {
    //   scrollTop(value) {
    //     return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
    //   },
    //   getBoundingClientRect() {
    //     return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    //   }
    // });

    // OPTIONAL: pause when tab is hidden (saves work)
    const onVisibility = () => {
      if (document.hidden) {
        gsap.ticker.remove(update);
      } else {
        gsap.ticker.add(update);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Refresh after everything is ready
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [options]);

  // Handy helper if you want to scroll programmatically:
  // useLenis().current?.scrollTo("#section5", { offset: -40 });
  return lenisRef;
}
