// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="w-full footer-inner">
        {/* Left: brand */}
        <div className="footer-brand">
          <img
            src="/assets/logo.png"
            alt="Sonexa"
            className="footer-logo"
          />
          
        </div>

        {/* Middle: links */}
        <div className="footer-links">
          <span className="footer-links-title">Explore</span>
          <div className="footer-links-row">
            <a href="#section2">Features</a>
            <a href="#section5">Top Picks</a>
            <a href="#section6">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Right: meta */}
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} Sonexa.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
