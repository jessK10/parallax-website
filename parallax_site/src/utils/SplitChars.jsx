import React from "react";
export default function SplitChars({ text }){
  return (
    <h1 className="heading">
      <span className="row">
        {text.split("").map((ch, i) => (
          <span className="char" key={i}>{ch}</span>
        ))}
      </span>
    </h1>
  );
}
