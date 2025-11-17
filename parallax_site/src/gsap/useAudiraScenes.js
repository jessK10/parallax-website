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
      const hasIntro = !!document.getElementById("intro");

      // HERO: heading letters burst
      if (!reduce && !hasIntro) {
        const chars = gsap.utils.toArray("#section1 .heading .char");
        if (chars.length) {
          gsap.from(chars, {
            yPercent: () => gsap.utils.random(-100, 100),
            rotation: () => gsap.utils.random(-30, 30),
            autoAlpha: 0,
            ease: "back.out(1.5)",
            stagger: { amount: 0.5, from: "random" },
            duration: 1.5
          });
        }
      } else if (reduce) {
        gsap.set("#section1 .heading .char", {
          yPercent: 0,
          rotation: 0,
          autoAlpha: 1
        });
      }

      // HERO: headphone pop-in
      if (!hasIntro) {
        gsap.from("#headphone", {
          opacity: 0,
          scale: reduce ? 1 : 0,
          duration: 1,
          delay: 1,
          ease: "power1.inOut"
        });
      }

      gsap.set("#headphone", { pointerEvents: "none" });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 991px)", () => {
        // SECTION 2
        gsap.to("#headphone", {
          scrollTrigger: {
            trigger: "#section2",
            start: "top bottom",
            end: "center center",
            scrub: true
          },
          y: "85vh",
          x: "18vw",
          width: "32vw",
          rotate: 90,
          ease: "power1.inOut",
          immediateRender: false
        });

        // SECTION 3
        gsap.to("#headphone", {
          scrollTrigger: {
            trigger: "#section3",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          },
          y: "218vh",
          x: "0",
          width: "35vw",
          rotate: 35,
          ease: "power1.inOut",
          immediateRender: false
        });

        // SECTION 4
        gsap.to("#headphone", {
          scrollTrigger: {
            trigger: "#section4",
            start: "top bottom",
            end: "center center",
            scrub: true
          },
          y: "308vh",
          width: "42vw",
          rotate: 0,
          ease: "power1.inOut",
          immediateRender: false
        });

        // SECTION 5 – arrive on TOP PICKS, then slowly slide down
        const midY = isShortHeight ? "360vh" : "344vh";  // where it sits over TOP PICKS
        const finalY = isShortHeight ? "432vh" : "419vh"; // final lower position

        // 1) Move from section 4 position to TOP PICKS and "stop" there
        gsap.to("#headphone", {
          scrollTrigger: {
            trigger: "#section5",
            start: "top bottom",
            end: "top center",
            scrub: 1.2   // a bit smoother than true
          },
          y: midY,
          width: "28vw",
          ease: "power1.inOut",
          immediateRender: false
        });

        // 2) From TOP PICKS, slowly slide further down as you keep scrolling
        gsap.to("#headphone", {
          scrollTrigger: {
            trigger: "#section5",
            start: "top center",
            end: "bottom bottom",
            scrub: 2      // bigger scrub = slower laggy movement
          },
          y: finalY,
          width: "300px",
          ease: "power1.inOut",
          immediateRender: false
        });

        // CONTENT REVEALS
        gsap.from("#section2 .content-wrapper", {
          scrollTrigger: {
            trigger: "#section2",
            start: "-50% bottom",
            end: "center center",
            scrub: true
          },
          y: "140%",
          ease: "power1.inOut"
        });

        gsap.from("#section3 .heading", {
          scrollTrigger: {
            trigger: "#section3",
            start: "top bottom",
            end: "center bottom",
            scrub: true
          },
          y: "140%",
          ease: "power1.inOut"
        });

        // NOTE: Section 4 images are handled by useGalleryScene, so no animation here.

        gsap.from("#section6 .content-wrapper", {
          scrollTrigger: {
            trigger: "#section6",
            start: "top bottom",
            end: "center center",
            scrub: true
          },
          y: "40%",
          duration: 2,
          ease: "power1.inOut"
        });

        return () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      });

      // MOBILE – just reset headphone positioning
      mm.add("(max-width: 990px)", () => {
        gsap.set("#headphone", {
          clearProps: "all",
          top: "6%",
          xPercent: -50,
          left: "50%"
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
