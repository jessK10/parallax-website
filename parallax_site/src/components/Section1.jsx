// src/components/Section1.jsx
import React from "react";

export default function Section1() {
  return (
    <section id="section1" className="w-full">
      <h1 className="heading">
        <span className="row">
          {"MODERN HARMONY".split("").map((ch, i) => (
            <span className="char" key={i}>{ch}</span>
          ))}
        </span>
      </h1>
    </section>
  );
}
