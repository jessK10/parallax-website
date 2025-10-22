// src/components/Section1.jsx
import React from "react";

export default function Section1() {
  return (
    <section id="section1" className="w-full">
      <h1 className="heading" aria-label="Urban Sonata">
        {/* Top line */}
        <span className="row">
          {"URBAN".split("").map((ch, i) => (
            <span className="char" key={`u-${i}`}>{ch}</span>
          ))}
        </span>

        <br />

        {/* Bottom line */}
        <span className="row">
          {"SONATA".split("").map((ch, i) => (
            <span className="char" key={`s-${i}`}>{ch}</span>
          ))}
        </span>
      </h1>
    </section>
  );
}
