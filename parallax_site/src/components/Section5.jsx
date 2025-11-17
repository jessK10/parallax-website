import React from "react";

export default function Section5(){
  return (
    <section id="section5" className="w-full">
      <h2 className="heading">Top Picks</h2>
      <div className="product-section">
        <div className="product">
          <img src="/assets/green.png" alt="Audira One" />
          <div className="name">Sonexa One</div>
          <div className="price">₹4,499</div>
        </div>
        <div className="product">
          <img src="/assets/brown-product.png" alt="" />
          <div className="name">Sonexa Plus</div>
          <div className="price">₹7,499</div>
        </div>
        <div className="product">
          <img src="/assets/black.png" alt="Audira Max Pro" />
          <div className="name">Sonexa Max Pro</div>
          <div className="price">₹11,499</div>
        </div>
      </div>
    </section>
  );
}
