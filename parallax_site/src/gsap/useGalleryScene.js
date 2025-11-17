import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGalleryScene() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#section4 img", {
        scrollTrigger: {
          trigger: "#section4",
          start: "top bottom",      // when top of section hits bottom of viewport
          end: "center center",     // until section center reaches viewport center
          scrub: true,              // tie animation to scroll (both directions)
        },
        opacity: 0,
        scale: 0.5,                  // zoom in effect (from 70% → 100%)
        ease: "power1.inOut",
        
      });
    });

    return () => ctx.revert();
  }, []);
}
