// src/components/OverlayText.jsx
import React, { useEffect } from "react";

/**
 * Centered overlay text with CSS-only in/hold/out animation.
 * Props:
 *  - text        : string
 *  - inMs        : number (default 200)
 *  - holdMs      : number (default 2600)
 *  - outMs       : number (default 400)
 *  - fontFamily  : string (optional)
 *  - fontSize    : string (e.g. "42px" or "clamp(26px, 6vw, 64px)")
 *  - shadow      : string (CSS text-shadow)
 *  - animKey     : number (change to replay)
 */
export default function OverlayText({
  text = "URBAN SONATA",
  inMs = 200,
  holdMs = 2600,
  outMs = 400,
  fontFamily = '"Outfit", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  fontSize = "clamp(28px, 7vw, 72px)",
  shadow = "0 10px 28px rgba(0,0,0,.35)",
  animKey = 0,
}) {
  const total = inMs + holdMs + outMs;

  useEffect(() => {
    // nothing to do; presence forces re-render when animKey changes
  }, [animKey]);

  return (
    <>
      <style>
        {`
        @keyframes ovtxt_fade_scale {
          0%    { opacity: 0; transform: scale(0.90); }
          ${Math.round((inMs / total) * 100)}% { opacity: 1; transform: scale(1.0); }
          ${Math.round(((inMs + holdMs) / total) * 100)}% { opacity: 1; transform: scale(1.0); }
          100% { opacity: 0; transform: scale(1.0); }
        }
      `}
      </style>

      <div
        key={animKey}                 // changing animKey restarts the CSS animation
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          zIndex: 50,                 // make sure it sits above hero elements
        }}
      >
        <div
          style={{
            color: "#1A365D",         // your primary brand blue
            fontFamily,
            fontWeight: 800,
            letterSpacing: ".06em",
            lineHeight: 0.95,
            textTransform: "uppercase",
            textShadow: shadow,
            fontSize,
            animation: `ovtxt_fade_scale ${total}ms ease-out forwards`,
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
}
