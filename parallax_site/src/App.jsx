// src/App.jsx
import React from "react";
import useLenis from "./gsap/useLenis.js";
import useAudiraScenes from "./gsap/useAudiraScenes.js";

import Navbar from "./components/Navbar.jsx";
import Headphone from "./components/Headphone.jsx";
import Section1 from "./components/Section1.jsx";
import Section2 from "./components/Section2.jsx";
import Section3 from "./components/Section3.jsx";
import Section4 from "./components/Section4.jsx";
import Section5 from "./components/Section5.jsx";
import Section6 from "./components/Section6.jsx";
import Footer from "./components/Footer.jsx";

// ⬇️ Added: import the demo contact form
import DemoContact from "./components/demo/DemoContact.jsx";

export default function App() {
  useLenis();
  useAudiraScenes();

  return (
    <>
      <div className="header-spacer" />
      <div id="main" className="w-full">
        <Navbar />
        <Headphone />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />

        {/* ⬇️ Added: contact form as the last section */}
        <DemoContact />
      </div>
      <Footer />
    </>
  );
}
