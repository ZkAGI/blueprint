// components/TestimonialSun.jsx
import React from "react";
import atenImg from '../aten.jpeg'

export default function TestimonialSun({
  imageSrc = "/public/aten.png",
  quote = "We welcome anyone who wants to build a brighter future — for that is what Aten means: the Sun.",
  name = "Suraj Venkat",
  title = "Founder & CEO, ZkAGI",
}) {
  const [imgOk, setImgOk] = React.useState(true);

  return (
    <section className="w-full px-4 py-12">
      <div className="mx-auto max-w-xl rounded-3xl border border-cyan-400/30 bg-slate-900/70 backdrop-blur p-6 shadow-2xl relative overflow-hidden">
        {/* Sun avatar */}
        <div className="mx-auto w-28 h-28 relative mt-4">
          {/* Rays (outside the circle) */}
          <div
            className="absolute inset-[-28%] rounded-full opacity-70 animate-spin-slow z-0"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, rgba(34,211,238,.45) 0 8deg, transparent 8deg 15deg)",
              WebkitMask: "radial-gradient(circle at center, transparent 58%, #000 59%)",
              mask: "radial-gradient(circle at center, transparent 58%, #000 59%)",
              filter: "blur(2px)",
            }}
            aria-hidden
          />
          {/* Halo glow */}
          <div
            className="absolute inset-[-10%] rounded-full z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(34,211,238,.35), rgba(168,85,247,.15) 60%, transparent 72%)",
            }}
            aria-hidden
          />
          {/* Inner ring */}
          <div
            className="absolute inset-0 rounded-full z-20 pointer-events-none"
            style={{
              boxShadow:
                "0 0 0 2px rgba(203,213,225,.6) inset, 0 0 30px rgba(34,211,238,.35)",
            }}
            aria-hidden
          />
          {/* Image core (with fallback) */}
          {imgOk ? (
            <img
              src={atenImg}
              alt={`${name} headshot`}
              onError={() => setImgOk(false)}
              className="relative z-30 w-full h-full object-cover rounded-full border border-cyan-300/40 shadow-lg"
            />
          ) : (
            <div className="relative z-30 w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-sm text-cyan-100">
              {name?.split(" ").slice(0, 2).map(n => n[0]).join("")}
            </div>
          )}
        </div>

        {/* Quote */}

   

<div className="mt-5 text-left max-w-[42rem] mx-auto">
  {/* Opening quote */}
  

  {/* Quote text with closing quote directly after last char */}
  <span className="text-lg text-gray-200 leading-relaxed">
    <span className="text-5xl font-extrabold text-white leading-none italic">“</span>
    {quote}
    <span className="text-5xl font-extrabold text-white leading-none italic align-top ml-1">”</span>
  </span>
</div>




        {/* Name / title */}
        <div className="mt-6 text-left">
          <div className="font-bold text-white text-base">{name}</div>
          <div className="text-sm text-cyan-200/80">{title}</div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
      `}</style>
    </section>
  );
}
