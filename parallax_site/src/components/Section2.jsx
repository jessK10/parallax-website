export default function Section2() {
  return (
    <section id="section2" className="w-full">
      {/* ⬇this wrapper must exist because GSAP looks for "#section2 .content-wrapper" */}
      <div className="content-wrapper">
        <h2 className="heading">True Clarity</h2>
        <p>
          Engineered for clarity, comfort, and immersive sound — Audira redefines
          your listening experience with style and performance in perfect harmony.
        </p>
        <a href="#" className="btn radius">Buy Now</a>
      </div>

      {/* features grid */}
      <div className="feature-wrapper">
        {/* ...your feature boxes... */}
      </div>
    </section>
  );
}
