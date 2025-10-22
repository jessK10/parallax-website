// src/gsap/useAudiraScenes.js
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useAudiraScenes() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const isShortHeight = window.screen.height < 1050;
      const hasIntro = !!document.getElementById("intro"); // detect hero intro if present

      // HERO: letter burst (only if NO intro and NO reduced motion)
      if (!reduce && !hasIntro) {
        const chars = gsap.utils.toArray("#section1 .heading .char");
        if (chars.length) {
          gsap.from(chars, {
            yPercent: () => gsap.utils.random(-100, 100),
            rotation: () => gsap.utils.random(-30, 30),
            autoAlpha: 0,
            ease: "back.out(1.5)",
            stagger: { amount: 0.5, from: "random" },
            duration: 1.5,
          });
        }
      } else if (reduce) {
        // reduced motion: ensure visible
        gsap.set("#section1 .heading .char", { yPercent: 0, rotation: 0, autoAlpha: 1 });
      }

      // HERO: headphone pop-in (skip if intro handles it)
      if (!hasIntro) {
        gsap.from("#headphone", {
          opacity: 0,
          scale: reduce ? 1 : 0,
          duration: 1,
          delay: 1,
          ease: "power1.inOut",
        });
      }

      // keep image non-interactive
      gsap.set("#headphone", { pointerEvents: "none" });

      // Desktop timelines
      const mm = gsap.matchMedia();

      mm.add("(min-width: 991px)", () => {
        gsap.to("#headphone", {
          scrollTrigger: { trigger: "#section2", start: "top bottom", end: "center center", scrub: true },
          y: "85vh",
          x: "18vw",
          width: "32vw",
          rotate: 90,
          ease: "power1.inOut",
          immediateRender: false,
        });

        gsap.to("#headphone", {
          scrollTrigger: { trigger: "#section3", start: "top bottom", end: "bottom bottom", scrub: true },
          y: "218vh",
          x: "0",
          width: "35vw",
          rotate: 35,
          ease: "power1.inOut",
          immediateRender: false,
        });

        gsap.to("#headphone", {
          scrollTrigger: { trigger: "#section4", start: "top bottom", end: "center center", scrub: true },
          y: "308vh",
          width: "42vw",
          rotate: 0,
          ease: "power1.inOut",
          immediateRender: false,
        });

        // ---- STOP above Top Picks ----
        const stopY = isShortHeight ? 423 : 486;

        gsap.to("#headphone", {
          scrollTrigger: {
            trigger: "#section5",
            start: "top bottom+=90",
            end: "top center+=340",
            scrub: true,
          },
          y: `${stopY}vh`,
          x: "0vw",
          rotate: 0,
          width: "320px",
          ease: "power2.inOut",
          immediateRender: false,
        });

        // content reveals
        gsap.from("#section2 .content-wrapper", {
          scrollTrigger: { trigger: "#section2", start: "-50% bottom", end: "center center", scrub: true },
          y: "140%",
          ease: "power1.inOut",
        });

        gsap.from("#section3 .heading", {
          scrollTrigger: { trigger: "#section3", start: "top bottom", end: "center bottom", scrub: true },
          y: "140%",
          ease: "power1.inOut",
        });

        // ✅ UPDATED: Section 4 image reveal (no width animation)
        gsap.fromTo(
          "#section4 img",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: "#section4",
              start: "top bottom",
              end: "center center",
              scrub: true, // remove scrub & use toggleActions if you want one-shot
              // toggleActions: "play none none reverse",
            },
          }
        );

        gsap.from("#section6 .content-wrapper", {
          scrollTrigger: { trigger: "#section6", start: "top bottom", end: "center center", scrub: true },
          y: "40%",
          duration: 2,
          ease: "power1.inOut",
        });

        return () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      });

      // (optional) simple mobile setup
      mm.add("(max-width: 990px)", () => {
        gsap.set("#headphone", { clearProps: "all", top: "6%", xPercent: -50, left: "50%" });
      });
    });

    return () => ctx.revert();
  }, []);
}
