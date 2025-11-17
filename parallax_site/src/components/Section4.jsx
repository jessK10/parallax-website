import React from "react";
import useGalleryScene from "../gsap/useGalleryScene";

export default function Section4() {
  useGalleryScene();

  return (
    <section id="section4" className="w-full">
      <img src="/assets/img1.jpeg" alt="Gallery 1" className="img1 radius-lg" />
      <img src="/assets/img2.jpeg" alt="Gallery 2" className="img2 radius-lg" />
      <img src="/assets/img3.jpeg" alt="Gallery 3" className="img3 radius-lg" />
    </section>
  );
}
