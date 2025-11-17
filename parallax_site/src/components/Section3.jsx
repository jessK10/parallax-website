import React from "react";

export default function Section3(){
  return (
    <section id="section3" className="w-full">
      <h2 className="heading">Masterbeat</h2>
      <div className="content-wrapper">
        <video className="radius" autoPlay loop muted playsInline>
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>
        <div className="content">
          <p>Crafted for the modern audiophile, Sonexa headphones deliver sound so rich, it pulses through your senses.</p>
          <p>With Masterbeat, music becomes your personal soundtrack—bold, immersive, unforgettable.</p>
        </div>
      </div>
    </section>
  );
}
