// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <header>
      <nav className="w-full">
        <a href="#section1">
          <img
            src="/assets/logo.png"
            alt="Sonexa"
            className="logo"
          />
        </a>

        <a href="#section5" className="btn">
          Buy Now
        </a>
      </nav>
    </header>
  );
}
