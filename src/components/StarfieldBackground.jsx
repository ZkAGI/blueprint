import React, { useEffect, useRef } from "react";

export default function StarfieldBackground({ density = 0.0016, speed = 0.08 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      // full viewport for fixed background
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const starCount = () => Math.min(900, Math.max(200, Math.floor(canvas.width * canvas.height * density)));
    let stars = Array.from({ length: starCount() }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 0.9 + 0.3,
      s: Math.random() * 0.6 + 0.2,
      tw: Math.random() * Math.PI * 2,
      hue: 210 + Math.random() * 80,
    }));

    const rebuild = () => { stars = Array.from({ length: starCount() }).map(() => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 0.9 + 0.3, s: Math.random() * 0.6 + 0.2,
      tw: Math.random() * Math.PI * 2, hue: 210 + Math.random() * 80
    })); };

    let lastW = canvas.width, lastH = canvas.height;

    const loop = () => {
      const w = canvas.width, h = canvas.height;
      if (w !== lastW || h !== lastH) { lastW = w; lastH = h; rebuild(); }

      // night gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#06101e"); g.addColorStop(1, "#0b1020");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      // nebula blobs
      ctx.globalCompositeOperation = "lighter";
      const blob = (cx, cy, r, rgb, a = 0.25) => {
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        rg.addColorStop(0, `rgba(${rgb},${a})`); rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      };
      const m = Math.min(w, h);
      blob(w * 0.75, h * 0.25, m * 0.7, "120,130,255");
      blob(w * 0.55, h * 0.60, m * 0.9, "180,120,255");
      blob(w * 0.30, h * 0.80, m * 0.6, "100,180,255");
      ctx.globalCompositeOperation = "source-over";

      // stars
      for (const st of stars) {
        st.x += speed * st.s; st.y -= speed * 0.25 * st.s;
        if (st.x > w) st.x = 0; if (st.y < 0) st.y = h;
        st.tw += 0.04 + st.s * 0.02;
        const a = 0.4 + Math.abs(Math.sin(st.tw)) * 0.6;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${st.hue}, 90%, 80%, ${a})`;
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill();

        if (st.r > 0.8 && a > 0.8) {
          ctx.globalAlpha = 0.25 * a;
          ctx.fillRect(st.x - 0.6, st.y - 1.8, 1.2, 3.6);
          ctx.fillRect(st.x - 1.8, st.y - 0.6, 3.6, 1.2);
          ctx.globalAlpha = 1;
        }
      }

      // vignette
      const vg = ctx.createRadialGradient(w / 2, h / 1.2, 0, w / 2, h / 1.2, Math.max(w, h));
      vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [density, speed]);

  // FIXED so it spans the whole app while scrolling
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  );
}
