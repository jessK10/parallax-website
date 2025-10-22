// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <header>
      <nav className="w-full" aria-label="Main">
        {/* BRAND (rename text to your new name) */}
        <a href="#section1" className="logo" aria-label="Home">Sonexa</a>

        {/* BLUE CTA ON THE RIGHT */}
        <a href="#section5" className="btn header-cta">Buy Now</a>
      </nav>
    </header>
  );
}
