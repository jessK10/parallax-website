// src/components/Navbar.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";     
gsap.registerPlugin(ScrollTrigger);

export default function Navbar(){
  const navRef = useRef(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const links = Array.from(navRef.current.querySelectorAll('a[data-link]'));

    const setActive = (id) => {
      links.forEach(a => {
        const match = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("active", match);
        if (match) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
      });
    };

    const triggers = sections.map(sec => ScrollTrigger.create({
      trigger: sec, start: "top center", end: "bottom center",
      onEnter: () => setActive(sec.id), onEnterBack: () => setActive(sec.id),
    }));

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  return (
    <header className="nav" ref={navRef}>
      <div className="nav__logo">
        <span className="brand"><span className="brand-dot">A</span>udira</span>
      </div>
      <nav className="nav__links" aria-label="Primary">
        <a data-link href="#home">Home</a>
        <a data-link href="#features">Features</a>
        <a data-link href="#sound">Sound</a>
      </nav>
      <a className="buy" href="#buy">Buy Now</a>
    </header>
  );
}
