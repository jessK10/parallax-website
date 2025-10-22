// src/components/Section4.jsx
import React from "react";

export default function Section4() {
  return (
    <section id="section4" className="w-full">
      {/* These MUST exist in: public/assets/... */}
      <img src="/assets/img1.jpeg" alt="Gallery 1" className="img1 radius-lg" />
      <img src="/assets/img2.jpeg" alt="Gallery 2" className="img2 radius-lg" />
      <img src="/assets/img3.jpeg" alt="Gallery 3" className="img3 radius-lg" />
    </section>
  );
}
