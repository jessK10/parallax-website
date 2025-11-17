// src/components/Section2.jsx
import React from "react";

export default function Section2() {
  return (
    <section id="section2" className="w-full">
      <div className="content-wrapper">
        <h2 className="heading">True Clarity</h2>
        <p>
          Engineered for clarity, comfort, and immersive sound — Sonexa
          redefines your listening experience with style and performance
          in perfect harmony.
        </p>

        <button type="button" className="btn">
          Buy Now
        </button>
      </div>

      <div className="feature-row">
        <div className="feature-card">
          <h3 className="feature-title">Crystal-Clear Audio</h3>
          <p className="feature-text">
            Hear every detail with balanced bass and studio-quality mids and
            highs.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">All-Day Comfort</h3>
          <p className="feature-text">
            Lightweight build with plush ear cushions for an ergonomic fit.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">40+ Hour Battery</h3>
          <p className="feature-text">
            Long-lasting performance, wherever you go.
          </p>
        </div>
      </div>
    </section>
  );
}
