// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
// import ScrollPanel from './ScrollPanel'; 

// const YEAR_COPY = {
//   2015: { title: 'Origins in Academia and VR', body: 'Studied under Prof. Steve Lavelle; co-led a VR lab at IIT Madras. TA under Prof. Lui Sha (UIUC), focusing on real-time embedded systems.' },
//   2016: { title: 'Robotics & Augmented Intelligence', body: 'Built autonomous robot with Google Tango LiDAR; began Ethereum journey; AR interfaces at Mitsubishi Electric Automotive America.' },
//   2017: { title: 'Systems Engineering & Crypto', body: 'Systems engineering at a cybersecurity startup; active altcoin investor—learned crypto volatility firsthand.' },
//   2018: { title: 'Aten Ventures Is Born', body: 'Formed Aten Ventures LLC (USA); launched remote-first consulting/tech agency serving startups & institutions.' },
//   2019: { title: 'Global Client Work & Alliances', body: 'Served clients across Chicago/SV/NY; deep collaboration with Tektorch AI for APAC enterprise AI.' },
//   2020: { title: 'Enterprise Tech Facilitation', body: 'Launched Bitbaza (B2B deep-tech marketplace); facilitated $500K+ in high-ticket deals.' },
//   2021: { title: 'Product Pivot & AI Infra', body: 'After 50+ enterprise interviews, Bitbaza pivoted to scalable AI product; invested in AI infra; incorporated in Singapore.' },
//   2022: { title: 'Bootstrapped Scaling & Web3', body: 'Bitbaza profitable; $1M+ in value delivered; growing Web3 & mid-market adoption.' },
//   2023: { title: 'Agent Marketplace & Recognition', body: 'Launched agent marketplace; EngageX adopted by 20+ Web3 projects; recognized by Startup Lithuania; refocused on infra.' },
//   2024: { title: 'ZkAGI Is Born', body: 'Raised $500K+; launched ZkAGI DePIN cluster & ZkTerminal; 100K+ users; MoUs unlocking reach to 1M+ entrepreneurs; 100+ partnerships.' },
//   2025: { title: 'Recognition & Global Influence', body: '#3 in Solana AI Hackathon (AI Infra). Re-centered on enabling AI-first enterprises with product+capital+advisory.' },
// };

// function YearRail({
//   years = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
//   className = '',
//   dashClass = 'bg-white/60',
//   padX = 'px-4 sm:px-8 lg:px-16',
// }) {
//   const [activeIdx, setActiveIdx] = React.useState(null);
//   const [hoverable, setHoverable] = React.useState(true); // desktop = true, touch = false

//   // Detect desktop vs touch
//   React.useEffect(() => {
//     const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
//     const update = () => setHoverable(mq.matches);
//     update();
//     mq.addEventListener?.('change', update);
//     return () => mq.removeEventListener?.('change', update);
//   }, []);

//   // Close on any tap/click that's NOT a year item (capture phase works better on mobile)
//   React.useEffect(() => {
//     const closeOnAnyTap = (e) => {
//       if (e.target.closest('[data-year-item]')) return; // let item handler run
//       setActiveIdx(null);
//     };
//     document.addEventListener('pointerdown', closeOnAnyTap, true);
//     return () => document.removeEventListener('pointerdown', closeOnAnyTap, true);
//   }, []);

//   const anyOpen = activeIdx !== null;

//   return (
//     <div className={`w-full ${padX} ${className}`} style={{ paddingTop: 20, paddingBottom: 12 }}>
//       {/* Global scrim only for mobile/touch when any tooltip is open */}
//       {!hoverable && anyOpen && (
//         <button
//           type="button"
//           className="fixed inset-0 z-[9998] bg-black/40"
//           aria-label="Close tooltip"
//           onClick={() => setActiveIdx(null)}
//         />
//       )}

//       <div
//         className={[
//           'flex w-full items-center',
//           'overflow-x-auto md:overflow-visible overflow-y-visible',
//           'gap-3 sm:gap-4',
//           'snap-x snap-mandatory',
//           'scrollbar-thin',
//           'relative z-[60]', // keep above background
//         ].join(' ')}
//         style={{ touchAction: 'pan-x' }}
//       >
//         {years.map((year, i) => (
//           <React.Fragment key={year}>
//             <div
//               data-year-item
//               className="relative group flex-shrink-0 snap-start"
//               onMouseEnter={hoverable ? () => setActiveIdx(i) : undefined}
//               onMouseLeave={hoverable ? () => setActiveIdx((idx) => (idx === i ? null : idx)) : undefined}
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation(); // don't let global listener close immediately
//                 setActiveIdx((idx) => (idx === i ? null : i));
//               }}
//               aria-haspopup="dialog"
//               aria-expanded={activeIdx === i}
//             >
//               <span
//                 className={`inline-block rounded-md px-2 py-1 whitespace-nowrap tracking-wide cursor-pointer transition-colors duration-200 ${
//                   activeIdx === i ? 'text-cyan-300 bg-cyan-400/20' : 'text-white hover:text-cyan-300'
//                 }`}
//                 style={{ fontSize: 'clamp(13px, 3.5vw, 16px)', letterSpacing: '0.02em' }}
//               >
//                 {year}
//               </span>

//               {/* === DESKTOP tooltip (above year) === */}
//               {hoverable && (
//                 <div
//                   className={[
//                     'absolute bottom-full mb-2',
//                     activeIdx === i ? 'opacity-100 visible' : 'opacity-0 invisible',
//                     'transition-opacity duration-200',
//                     'z-[70]',
//                   ].join(' ')}
//                   style={{
//                     left: i === 0 ? 0 : '50%',
//                     transform:
//                       i === 0
//                         ? 'translateX(0)'
//                         : i === years.length - 1
//                         ? 'translateX(-100%)'
//                         : 'translateX(-50%)',
//                   }}
//                   role="dialog"
//                 >
//                   <div className="relative w-[380px] max-w-[85vw] rounded-xl border border-cyan-400/30 bg-slate-900/95 backdrop-blur-sm p-4 shadow-2xl">
//                     <div className="text-cyan-300 text-sm font-semibold mb-1">{YEAR_COPY[year]?.title}</div>
//                     <div className="text-gray-200 text-xs leading-relaxed">{YEAR_COPY[year]?.body}</div>
//                     <div
//                       className="absolute top-full"
//                       style={{
//                         left: i === 0 ? '24px' : i === years.length - 1 ? 'calc(100% - 24px)' : '50%',
//                         transform:
//                           i === 0 ? 'translateX(0)' : i === years.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
//                       }}
//                     >
//                       <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95" />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* === MOBILE tooltip (centered) === */}
//               {!hoverable && (
//                 <div
//                   className={[
//                     'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
//                     activeIdx === i ? 'opacity-100 visible' : 'opacity-0 invisible',
//                     'transition-opacity duration-200',
//                     'z-[9999]',
//                   ].join(' ')}
//                   role="dialog"
//                   onClick={() => setActiveIdx(null)} // tap tooltip closes
//                 >
//                   <div className="relative w-[360px] max-w-[90vw] rounded-xl border border-cyan-400/30 bg-slate-900/95 backdrop-blur-sm p-4 shadow-2xl">
//                     <div className="text-cyan-300 text-sm font-semibold mb-1">{YEAR_COPY[year]?.title}</div>
//                     <div className="text-gray-200 text-xs leading-relaxed">{YEAR_COPY[year]?.body}</div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* line between years */}
//             {i < years.length - 1 && (
//               <div
//                 className={`flex-1 h-px ${dashClass}`}
//                 style={{ minWidth: '24px', maxWidth: '64px', opacity: 0.7 }}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

// const GalaxyGlobe = () => {
//   const mountRef = useRef(null);
//   const sceneRef = useRef(null);
//   const globeRef = useRef(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [showBlueprints, setShowBlueprints] = useState(false);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     if (showBlueprints && scrollRef.current) {
//       setTimeout(() => {
//         scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
//         const firstButton = scrollRef.current.querySelector('button, [tabindex="0"]');
//         if (firstButton) firstButton.focus();
//       }, 100);
//     }
//   }, [showBlueprints]);

//   useEffect(() => {
//     if (!mountRef.current) return;
//     const container = mountRef.current;
//     const containerRect = container.getBoundingClientRect();

//     // Scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, containerRect.width / containerRect.height, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

//     renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     renderer.setSize(containerRect.width, containerRect.height);
//     renderer.setClearColor(0x000000, 0);
//     container.appendChild(renderer.domElement);

//     // Globe geometry
//     const geometry = new THREE.SphereGeometry(2.5, 24, 16);

//     const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.6 });
//     const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x0088ff, transparent: true, opacity: 0.2 });

//      const wireframeGlobe = new THREE.Mesh(geometry, wireframeMaterial);
//      const glowGlobe = new THREE.Mesh(geometry, glowMaterial);

//     // Give them names so click detection can work
// wireframeGlobe.name = "clickableSphere";
// glowGlobe.name = "clickableSphere";

//     glowGlobe.scale.set(0.95, 0.95, 0.95);
//     scene.add(wireframeGlobe);
//     scene.add(glowGlobe);

//     // ZkAGI sprite (camera-facing)
//     const dpr = Math.min(window.devicePixelRatio || 1, 2);
//     const textCanvas = document.createElement('canvas');
//     textCanvas.width = 1024 * dpr;
//     textCanvas.height = 512 * dpr;
//     const ctx = textCanvas.getContext('2d');
//     if (ctx) {
//       ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
//       ctx.fillStyle = 'white';
//       ctx.font = `bold ${Math.floor(300 * dpr)}px Arial`;
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillText('ZkAGI', textCanvas.width / 2, textCanvas.height / 2);
//     }

//     const spriteTexture = new THREE.CanvasTexture(textCanvas);
//     spriteTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
//     spriteTexture.needsUpdate = true;

//     const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture, transparent: true });
    
//     const textSprite = new THREE.Sprite(spriteMaterial);
//     textSprite.scale.set(1.8, 0.9, 0.9);
//     textSprite.position.set(0, 0, 3.5);

//     textSprite.raycast = () => {};

//     scene.add(textSprite);

//     // Camera
//     camera.position.z = 8;

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//     scene.add(ambientLight);
//     const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
//     pointLight.position.set(0, 0, 10);
//     scene.add(pointLight);

//     // Save refs
//     sceneRef.current = scene;
//     globeRef.current = { wireframe: wireframeGlobe, glow: glowGlobe, textSprite };

//     // === CLICK HANDLER ===
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// const onClick = (event) => {
//   const rect = renderer.domElement.getBoundingClientRect();
//   mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//   mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects([wireframeGlobe, glowGlobe], true);


// const hit = intersects.find(i => i.object.name === "clickableSphere");
// if (hit) {

//     window.open("https://zkterminal.zkagi.ai", "_blank");
//   }
// };

// renderer.domElement.addEventListener("click", onClick);


//     // Animate
//     let rafId;
//     const animate = () => {
//       rafId = requestAnimationFrame(animate);
//       if (globeRef.current) {
//         globeRef.current.wireframe.rotation.x += 0.005;
//         globeRef.current.wireframe.rotation.y += 0.01;
//         globeRef.current.glow.rotation.x += 0.005;
//         globeRef.current.glow.rotation.y += 0.01;
//         globeRef.current.textSprite.lookAt(camera.position);
//       }
//       renderer.render(scene, camera);
//     };
//     animate();
//     setIsLoaded(true);

//     // Resize
//     const handleResize = () => {
//       if (!mountRef.current) return;
//       const rect = mountRef.current.getBoundingClientRect();
//       camera.aspect = rect.width / rect.height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(rect.width, rect.height);
//     };
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       cancelAnimationFrame(rafId);
//       window.removeEventListener('resize', handleResize);
//       renderer.domElement.removeEventListener("click", onClick);
//       try {
//         scene.clear();
//         geometry.dispose();
//         wireframeMaterial.dispose();
//         glowMaterial.dispose();
//         spriteMaterial.dispose();
//         spriteTexture.dispose();
//       } catch {}
//       if (container && renderer.domElement) container.removeChild(renderer.domElement);
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-gray-900 overflow-y-auto overflow-x-hidden">
//       {/* Galaxy Background */}
//       <div className="fixed inset-0 opacity-70 pointer-events-none">
//         <div className="galaxy-bg w-full h-full"></div>
//       </div>

//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-blue-400 opacity-20 animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${Math.random() * 4 + 1}px`,
//               height: `${Math.random() * 4 + 1}px`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${Math.random() * 2 + 2}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Content Container */}
//       <div className="relative z-10 flex flex-col items-center justify-start text-white text-center px-4 pt-4">
//         <div className="mb-20">
//           <p className="text-lg text-gray-300 tracking-wider">ATEN VENTURES</p>
//         </div>

//         <div className="mb-5">
//           <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent max-w-4xl">
//             Blueprints to make any business AI-first
//           </h1>
//         </div>

//         {/* Three.js Globe */}
//         <div className="w-72 h-40 relative z-20">
//           <div ref={mountRef} className="absolute inset-0" />
//           {!isLoaded && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-blue-400 animate-pulse">Loading...</div>
//             </div>
//           )}
//         </div>

//         {/* Colosseum Image */}
//         <div className="mb-4 relative w-full max-w-2xl">
//           <div className="w-full h-full flex items-center justify-center">
//             <img src="/colosseum.png" alt="Colosseum" className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-contain" />
//           </div>
//         </div>

//         {/* Timeline */}
//         <YearRail years={['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025']} />

//         {/* Buttons */}
//         <div className="flex gap-6 mt-20 mb-10">
//           <button
//             onClick={() => { window.location.href = 'https://tidycal.com/zkagi/blueprint-call'; }}
//             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
//           >
//             Book a call
//           </button>

//           <button
//             onClick={() => {
//               setShowBlueprints(!showBlueprints);
//               if (!showBlueprints) {
//                 setTimeout(() => {
//                   if (scrollRef.current) {
//                     const yOffset = -100;
//                     const el = scrollRef.current;
//                     const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
//                     window.scrollTo({ top: y, behavior: 'smooth' });
//                   }
//                 }, 150);
//               }
//             }}
//             className="px-8 py-3 border border-blue-400 rounded-lg hover:bg-blue-400/20 transition-all font-semibold"
//           >
//             {showBlueprints ? 'Hide Blueprints' : 'Choose Your Blueprint'}
//           </button>
//         </div>

//         {/* === Scroll panel === */}
//         <div ref={scrollRef} className="w-full">
//           <ScrollPanel open={showBlueprints} imageUrl="./scroll-full.png" className="mb-20">
//              {/* === Your existing long content goes here (unchanged) === */}
//             <div className="text-center mb-8">
//               <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
//                 Aten Ventures Blueprint Catalog
//               </h1>
//               <p className="text-cyan-200 text-lg mt-2">For Real Builders</p>
//             </div>

//             <p className="mb-8 text-lg leading-relaxed text-gray-300">
//               Welcome to the Temple. Below are the blueprints for founders and teams who want to build AI-first companies – without the fluff, jargon, or consultants who've never touched a repo.
//             </p>

//             <div className="space-y-8">
//               {/* Venture Blueprint */}
//               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
//                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🔥 The Venture Blueprint (Master Blueprint)</h2>
//                 <p className="mb-3 text-gray-300">Everything you need to go from Zero → Revenue → Funded.</p>
//                 <p className="mb-3 italic text-purple-300">Perfect if you're starting up, pivoting, or tired of hopping on 100 Discords a day hoping alpha finds you.</p>
//                 <div className="ml-6 mb-3">
//                   <p className="font-semibold mb-2 text-cyan-200">Includes:</p>
//                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
//                     <li>GTM strategy that actually fits your niche & budget</li>
//                     <li>Tech plan: AI, dev stack, infra, build-or-buy decisions</li>
//                     <li>Fundraising prep: deck, narrative, targets</li>
//                     <li>Compliance & structuring sanity (without legalese overdose)</li>
//                   </ul>
//                 </div>
//                 <p className="text-sm text-cyan-200">📦 Output: Custom 10–15 page doc + roadmap + 2 calls</p>
//                 <p className="text-sm font-bold text-purple-300">💸 $3,500 (lite version) → $7,500+ (custom deep-dive)</p>
//                 <p className="text-sm text-cyan-200">🛠 Execution available milestone-by-milestone</p>
//               </div>

//               {/* GTM Blueprint */}
//               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
//                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🚀 GTM Blueprint</h2>
//                 <p className="mb-3 italic text-purple-300">Because "build it and they will come" only works in movies.</p>
//                 <div className="ml-6 mb-3">
//                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
//                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
//                     <li>ICP clarity & sharp positioning</li>
//                     <li>Channel & budget-tested launch plan</li>
//                     <li>Messaging so tight your users will tattoo it</li>
//                   </ul>
//                 </div>
//                 <p className="text-sm text-cyan-200">📦 Output: GTM doc + metrics dashboard starter</p>
//                 <p className="text-sm font-bold text-purple-300">💸 $1,500–$3,000</p>
//               </div>

//               {/* Tech Blueprint */}
//               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
//                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🧠 Tech Blueprint</h2>
//                 <p className="mb-3 italic text-purple-300">"Should we use ChatGPT or build our own model?" We answer that + more.</p>
//                 <div className="ml-6 mb-3">
//                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
//                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
//                     <li>MVP scope that won't bankrupt you</li>
//                     <li>AI-infra plan that scales</li>
//                     <li>Dev architecture that won't need to be rewritten every 3 months</li>
//                   </ul>
//                 </div>
//                 <p className="text-sm text-cyan-200">📦 Output: MVP + infra plan + TDD-ready build roadmap</p>
//                 <p className="text-sm font-bold text-purple-300">💸 $2,500–$5,000</p>
//               </div>

//               {/* Fundraising Blueprint */}
//               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
//                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">💼 Fundraising Blueprint</h2>
//                 <p className="mb-3 italic text-purple-300">"So…what do VCs actually want?"</p>
//                 <div className="ml-6 mb-3">
//                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
//                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
//                     <li>Polished deck & narrative</li>
//                     <li>Custom investor list</li>
//                     <li>Financials that don't look made up</li>
//                     <li>Intro support if aligned</li>
//                   </ul>
//                 </div>
//                 <p className="text-sm text-cyan-200">📦 Output: Pitch kit + data room checklist + mock Q&A</p>
//                 <p className="text-sm font-bold text-purple-300">💸 $1,500–$4,000 (Equity or kicker negotiable)</p>
//               </div>

//               {/* Compliance Blueprint */}
//               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
//                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">⚖️ Compliance Blueprint</h2>
//                 <p className="mb-3 italic text-purple-300">So you don't get fined into oblivion.</p>
//                 <div className="ml-6 mb-3">
//                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
//                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
//                     <li>Regulatory checklist (GDPR, AML, AI laws, etc.)</li>
//                     <li>Market entry structuring options</li>
//                     <li>Policies, docs, setup plan</li>
//                   </ul>
//                 </div>
//                 <p className="text-sm text-cyan-200">📦 Output: Notion-ready compliance plan</p>
//                 <p className="text-sm font-bold text-purple-300">💸 $1,200–$3,000</p>
//               </div>

//               {/* AI Integration Blueprint */}
//               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
//                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🤖 AI Integration Blueprint (for Enterprises)</h2>
//                 <p className="mb-3 italic text-purple-300">How to go from "we should use AI" → "we 10x'd ops with AI."</p>
//                 <div className="ml-6 mb-3">
//                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
//                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
//                     <li>Internal use-case map</li>
//                     <li>Pilot rollout plan</li>
//                     <li>Tool, model, talent map</li>
//                     <li>Governance & ROI metrics</li>
//                   </ul>
//                 </div>
//                 <p className="text-sm text-cyan-200">📦 Output: Executive-ready AI roadmap</p>
//                 <p className="text-sm font-bold text-purple-300">💸 $5,000–$15,000+</p>
//               </div>

//               {/* Footer */}
//               <div className="mt-12 pt-8 border-t-2 border-cyan-400/50 text-left">
//                 <p className="mb-4 text-lg text-gray-300">
//                   We built this because we've been there. Bootstrapped, blown up portfolios, helped scale 7-figure products. We're not McKinsey. We're not chatbots. We're operators who help you build real s*** that ships.
//                 </p>
//                 <p className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
//                   Let's make something incredible.
//                 </p>
//                <p className="text-center text-lg font-bold text-cyan-300">
//   <a
//     href="https://tidycal.com/zkagi/blueprint-call"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:underline"
//   >
//     🪷 Book a Blueprint Call
//   </a>
// </p>

//               </div>
//             </div>

//             {/* Aten Ventures Entities */}
// <div className="mt-12 pt-8 border-t-2 border-cyan-400/50">
//   <details className="group">
//     <summary className="cursor-pointer text-cyan-300 text-lg font-semibold hover:text-purple-300 transition-colors">
//       More About Aten Ventures Group
//     </summary>
//     <div className="mt-4 space-y-2 text-gray-300 text-sm">
//       <p><span className="font-bold text-cyan-200">Aten Ventures LLC</span> (USA)</p>
//       <p><span className="font-bold text-cyan-200">Aten Ventures Studio Pte. Ltd.</span> (Singapore)</p>
//       <p><span className="font-bold text-cyan-200">“MB” Bitbaza</span> (Lithuania)</p>
//       <p><span className="font-bold text-cyan-200">ML BIZ LLP</span> (India)</p>

//       <div className="pt-4">
//         <p className="font-bold text-cyan-200">📬 Mailing Address:</p>
//         <p>620 S 7th St, PMB 1968</p>
//         <p>Nevada, Las Vegas, 89101</p>
//         <p>United States</p>
//       </div>
//     </div>
//   </details>
// </div>

//           </ScrollPanel>
//         </div>
//       </div>

//       {/* CSS */}
//       <style jsx>{`
//         .galaxy-bg {
//           background: radial-gradient(
//             ellipse at center,
//             rgba(30, 58, 138, 0.4) 0%,
//             rgba(15, 23, 42, 0.8) 50%,
//             rgba(2, 6, 23, 1) 100%
//           );
//           position: relative;
//         }
//         .galaxy-bg::before {
//           content: '';
//           position: absolute; inset: 0;
//           background-image:
//             radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,.5), transparent),
//             radial-gradient(2px 2px at 40px 70px, rgba(147,197,253,.4), transparent),
//             radial-gradient(1px 1px at 90px 40px, rgba(167,139,250,.3), transparent),
//             radial-gradient(1px 1px at 130px 80px, rgba(96,165,250,.2), transparent),
//             radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,.4), transparent);
//           background-repeat: repeat;
//           background-size: 200px 100px;
//           animation: galaxyMove 20s linear infinite;
//         }
//         @keyframes galaxyMove { from { transform: translateY(0px); } to { transform: translateY(-100px); } }
//         @keyframes twinkle { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
//         .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
//         .scrollbar-thin::-webkit-scrollbar { width: 8px; }
//         .scrollbar-thin::-webkit-scrollbar-track { background: rgba(30,58,138,.3); border-radius: 4px; }
//         .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(6,182,212,.7); border-radius: 4px; }
//         .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,.9); }
//       `}</style>

//       {/* Footer */}
//      {/* Footer */}
// <footer className="w-full mt-16 mb-2 border-t border-cyan-400/40">
//   <div className="mx-auto max-w-screen-2xl px-4 py-6 pb-[env(safe-area-inset-bottom)]">
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
//       <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//          href="https://www.linkedin.com/in/surajvenkat" target="_blank" rel="noopener noreferrer">
//         LinkedIn (Suraj Venkat)
//       </a>
//       <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//          href="https://www.linkedin.com/company/aten-ventures-studio/" target="_blank" rel="noopener noreferrer">
//         LinkedIn (Aten Ventures Studio)
//       </a>
//       <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//          href="https://x.com/atenkrotos" target="_blank" rel="noopener noreferrer">
//         X (Aten Krotos)
//       </a>
//       <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//          href="https://x.com/atenventures" target="_blank" rel="noopener noreferrer">
//         X (Aten Ventures)
//       </a>
//       <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//          href="https://surajvenkat.medium.com/" target="_blank" rel="noopener noreferrer">
//         Medium
//       </a>
//       <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//          href="https://youtube.com/@decodingventure?feature=shared" target="_blank" rel="noopener noreferrer">
//         YouTube
//       </a>
//     </div>
//   </div>
// </footer>


//     </div>
//   );
// };

// export default GalaxyGlobe;


import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import ScrollPanel from './ScrollPanel';

const YEAR_COPY = {
  2015: { title: 'Origins in Academia and VR', body: 'Aten studied under Professor Steve Lavelle, a pioneer in Virtual Reality, and co-led a VR lab course for IIT Madras. Simultaneously, he was a teaching assistant under Prof. Lui Sha at the University of Illinois Urbana-Champaign — a globally recognized leader in real-time embedded systems. Aten supported Prof. Sha’s embedded systems lab, deepening his expertise in real-time architectures and mission-critical computation.' },
  2016: { title: 'Robotics & Augmented Intelligence', body: 'Aten developed his first autonomous robot for point cloud navigation in unfamiliar terrain using a Google Tango LiDAR tablet — a breakthrough that merged virtual simulation with real-time robotic path planning. He also began his personal crypto journey with Ethereum. Professionally, he joined Mitsubishi Electric Automotive America to design AR interfaces for industrial applications.' },
  2017: { title: 'Systems Engineering & Crypto', body: 'He took on a systems engineering role at a cybersecurity startup. This was also the year Aten became an active investor in altcoins, experiencing major upside and learning the volatility of the crypto space firsthand.' },
  2018: { title: 'Aten Ventures Is Born', body: 'After the 2018 crypto crash, Aten formalized Aten Ventures LLC (USA), betting everything on his own mission. With limited savings, he started a remote-first consulting and tech agency, helping startups and institutions navigate innovation and financial markets.' },
  2019: { title: 'Global Client Work & Alliances', body: 'Aten Ventures grew to serve cybersecurity and consumer app clients across Chicago, Silicon Valley, and New York. That same year, Aten entered into a deep collaboration with Tektorch AI, servicing top APAC enterprises in AI research and deployment.' },
  2020: { title: 'Enterprise Tech Facilitation', body: 'Aten Ventures expanded its team and revenue. Aten launched Bitbaza, a B2B marketplace for deep tech solutions — facilitating over $500K+ in high-ticket deals between buyers and solution providers.' },
  2021: { title: 'Product Pivot & AI Infra', body: 'Following interactions with over 50 enterprise clients, Bitbaza pivoted to a scalable AI product for sales and growth. Revenue surged, and resources were directed into developing internal AI infrastructure. Aten Ventures was incorporated in Singapore as Aten Ventures Studio Pte. Ltd. ' },
  2022: { title: 'Bootstrapped Scaling & Web3', body: 'Bitbaza hit profitability and reached $1M+ in business value delivered. Web3 startups and mid-sized enterprises began adopting Bitbaza’s tools. Growth was sustained through a bootstrapped approach, emphasizing long-term autonomy.' },
  2023: { title: 'Agent Marketplace & Recognition', body: 'Bitbaza launched a new vision: an autonomous agent marketplace. Its top agent, EngageX, was adopted by 20+ web3 projects. However, the marketplace model had limitations. Aten shifted focus to foundational infrastructure and was recognized for innovation by Startup Lithuania.' },
  2024: { title: 'ZkAGI Is Born', body: 'ZkAGI emerged as the evolved identity of Aten Ventures’ product arm. It raised $500K+, launched its ZkAGI DePIN cluster, ZkTerminal, and onboarded over 100,000+ users. Aten Ventures signed MoUs with universities and startup societies, unlocking distribution to 1M+ global entrepreneurs. 100+ partnerships were secured worldwide.' },
  2025: { title: 'Recognition & Global Influence', body: 'ZkAGI secured #3 in the Solana AI Hackathon (Jan–Feb) in the AI infrastructure track. Although the token launch faced delays, Aten Ventures refocused its mission to support AI-first enterprises with a bootstrapper’s mindset — blending product, capital, and advisory to build ethical, profitable AI businesses. The Aten Ventures network now includes VCs, LPs, family offices, and founders across the world.' },
};

// function YearRail({
//   years = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
//   className = '',
//   dashClass = 'bg-white/60',
//   padX = 'px-4 sm:px-8 lg:px-16',
// }) {
//   const [activeIdx, setActiveIdx] = React.useState(null);

//   // --- Mobile: vertical accordion (md:hidden) ---
//   const Mobile = () => (
//     <ul className="md:hidden space-y-2">
//       {years.map((y, i) => {
//         const open = activeIdx === i;
//         return (
//           <li key={y} className="rounded-xl border border-cyan-400/30 bg-slate-900/60 backdrop-blur-sm">
//             <button
//               type="button"
//               onClick={() => setActiveIdx(open ? null : i)}
//               className="w-full flex items-center justify-between px-4 py-3"
//             >
//               <span className={`text-base font-medium ${open ? 'text-cyan-300' : 'text-white'}`}>{y}</span>
//               <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
//               </svg>
//             </button>
//             <div className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
//               <div className="overflow-hidden px-4 pb-4 text-sm leading-relaxed text-gray-200">
//                 <div className="text-cyan-300 font-semibold mb-1">{YEAR_COPY[y]?.title}</div>
//                 <div>{YEAR_COPY[y]?.body}</div>
//               </div>
//             </div>
//           </li>
//         );
//       })}
//     </ul>
//   );

//   // --- Desktop: horizontal rail with tooltip (hidden on mobile) ---
//   const Desktop = () => {
//     const [hoverIdx, setHoverIdx] = React.useState(null);
//     return (
//       <div className="hidden md:flex w-full items-center gap-4 relative z-[60]">
//         {years.map((year, i) => (
//           <React.Fragment key={year}>
//             <div
//               className="relative group"
//               onMouseEnter={() => setHoverIdx(i)}
//               onMouseLeave={() => setHoverIdx(idx => (idx === i ? null : idx))}
//             >
//               <span
//                 className={`inline-block rounded-md px-2 py-1 cursor-pointer transition-colors ${
//                   hoverIdx === i ? 'text-cyan-300 bg-cyan-400/20' : 'text-white hover:text-cyan-300'
//                 }`}
//               >
//                 {year}
//               </span>

//               {/* Tooltip */}
//               <div
//                 className={[
//                   'absolute bottom-full mb-2',
//                   hoverIdx === i ? 'opacity-100 visible' : 'opacity-0 invisible',
//                   'transition-opacity duration-200 z-[70]',
//                 ].join(' ')}
//                 style={{
//                   left: i === 0 ? 0 : '50%',
//                   transform:
//                     i === 0 ? 'translateX(0)' :
//                     i === years.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
//                 }}
//               >
//                 <div className="relative w-[380px] max-w-[85vw] rounded-xl border border-cyan-400/30 bg-slate-900/95 backdrop-blur-sm p-4 shadow-2xl">
//                   <div className="text-cyan-300 text-sm font-semibold mb-1">{YEAR_COPY[year]?.title}</div>
//                   <div className="text-gray-200 text-xs leading-relaxed">{YEAR_COPY[year]?.body}</div>
//                   <div className="absolute top-full left-1/2 -translate-x-1/2">
//                     <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {i < years.length - 1 && (
//               <div className={`flex-1 h-px ${dashClass}`} style={{ minWidth: 24, maxWidth: 64, opacity: 0.7 }} />
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className={`w-full ${padX} ${className}`} style={{ paddingTop: 20, paddingBottom: 12 }}>
//       <Mobile />
//       <Desktop />
//     </div>
//   );
// }

function YearRail({
  years = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
  className = '',
  dashClass = 'bg-white/60',
  padX = 'px-4 sm:px-8 lg:px-16',
}) {
  // which card is “active” (bigger dot + tinted card)
  const [activeIdx, setActiveIdx] = React.useState(0);

  // ---------- MOBILE: vertical timeline ----------
  const Mobile = () => (
  <div className="md:hidden relative">
    {/* left rail */}
    <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-cyan-400/40" />
    <ul className="space-y-4 pl-10">
      {years.map((y, i) => {
        const active = activeIdx === i;
        return (
          <li key={y} className="relative">
            {/* dot */}
            <span
              className={[
                'absolute -left-[18px] top-5 inline-block rounded-full border cursor-pointer',
                active
                  ? 'w-3 h-3 border-cyan-300 bg-cyan-400/30'
                  : 'w-3 h-3 border-cyan-300 bg-slate-900'
              ].join(' ')}
              onClick={() => setActiveIdx(active ? null : i)}
            />

            {/* card */}
            <button
              type="button"
              onClick={() => setActiveIdx(active ? null : i)}
              className={[
                'w-full text-left rounded-2xl px-4 py-4',
                'border backdrop-blur-sm transition-colors',
                active
                  ? 'border-cyan-400/60 bg-cyan-500/10'
                  : 'border-cyan-400/30 bg-slate-900/60',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold">{y}</h3>
                <svg
                  className={`h-4 w-4 text-cyan-200 transition-transform duration-200 ${
                    active ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
                </svg>
              </div>
              <div className="mt-1 text-cyan-300 text-sm font-medium">{YEAR_COPY[y]?.title}</div>
              
              {/* Body only shows if active */}
              {active && (
                <p className="mt-2 text-gray-200 text-sm leading-relaxed">
                  {YEAR_COPY[y]?.body}
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

  // ---------- DESKTOP: keep your horizontal rail ----------
  const Desktop = () => {
    const [hoverIdx, setHoverIdx] = React.useState(null);
    return (
      <div className="hidden md:flex w-full items-center gap-4 relative z-[60]">
        {years.map((year, i) => (
          <React.Fragment key={year}>
            <div
              className="relative group"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(idx => (idx === i ? null : idx))}
            >
              <span
                className={`inline-block rounded-md px-2 py-1 cursor-pointer transition-colors ${
                  hoverIdx === i ? 'text-cyan-300 bg-cyan-400/20' : 'text-white hover:text-cyan-300'
                }`}
              >
                {year}
              </span>

              {/* tooltip */}
              <div
                className={[
                  'absolute bottom-full mb-2',
                  hoverIdx === i ? 'opacity-100 visible' : 'opacity-0 invisible',
                  'transition-opacity duration-200 z-[70]',
                ].join(' ')}
                style={{
                  left: i === 0 ? 0 : '50%',
                  transform:
                    i === 0 ? 'translateX(0)' :
                    i === years.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
                }}
              >
                <div className="relative w-[380px] max-w-[85vw] rounded-xl border border-cyan-400/30 bg-slate-900/95 backdrop-blur-sm p-4 shadow-2xl">
                  <div className="text-cyan-300 text-sm font-semibold mb-1">{YEAR_COPY[year]?.title}</div>
                  <div className="text-gray-200 text-xs leading-relaxed">{YEAR_COPY[year]?.body}</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-900/95" />
                  </div>
                </div>
              </div>
            </div>

            {i < years.length - 1 && (
              <div className={`flex-1 h-px ${dashClass}`} style={{ minWidth: 24, maxWidth: 64, opacity: 0.7 }} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full ${padX} ${className}`} style={{ paddingTop: 20, paddingBottom: 12 }}>
      <Mobile />
      <Desktop />
    </div>
  );
}


const GalaxyGlobe = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const globeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBlueprints, setShowBlueprints] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (showBlueprints && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        const firstButton = scrollRef.current.querySelector('button, [tabindex="0"]');
        if (firstButton) firstButton.focus();
      }, 100);
    }
  }, [showBlueprints]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const containerRect = container.getBoundingClientRect();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRect.width / containerRect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(containerRect.width, containerRect.height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2.5, 24, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.6 });
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x0088ff, transparent: true, opacity: 0.2 });

    const wireframeGlobe = new THREE.Mesh(geometry, wireframeMaterial);
    const glowGlobe = new THREE.Mesh(geometry, glowMaterial);
    wireframeGlobe.name = 'clickableSphere';
    glowGlobe.name = 'clickableSphere';
    glowGlobe.scale.set(0.95, 0.95, 0.95);
    scene.add(wireframeGlobe);
    scene.add(glowGlobe);

    // ZkAGI text sprite
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 1024 * dpr;
    textCanvas.height = 512 * dpr;
    const ctx = textCanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.fillStyle = 'white';
      ctx.font = `bold ${Math.floor(300 * dpr)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ZkAGI', textCanvas.width / 2, textCanvas.height / 2);
    }
    const spriteTexture = new THREE.CanvasTexture(textCanvas);
    spriteTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    spriteTexture.needsUpdate = true;
    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture, transparent: true });
    const textSprite = new THREE.Sprite(spriteMaterial);
    textSprite.scale.set(1.8, 0.9, 0.9);
    textSprite.position.set(0, 0, 3.5);
    textSprite.raycast = () => {};
    scene.add(textSprite);

    camera.position.z = 8;
    scene.add(new THREE.AmbientLight(0x404040, 0.4));
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    sceneRef.current = scene;
    globeRef.current = { wireframe: wireframeGlobe, glow: glowGlobe, textSprite };

    // click → open
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([wireframeGlobe, glowGlobe], true);
      const hit = intersects.find(i => i.object.name === 'clickableSphere');
      if (hit) window.open('https://zkterminal.zkagi.ai', '_blank');
    };
    renderer.domElement.addEventListener('click', onClick);

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (globeRef.current) {
        globeRef.current.wireframe.rotation.x += 0.005;
        globeRef.current.wireframe.rotation.y += 0.01;
        globeRef.current.glow.rotation.x += 0.005;
        globeRef.current.glow.rotation.y += 0.01;
        globeRef.current.textSprite.lookAt(camera.position);
      }
      renderer.render(scene, camera);
    };
    animate();
    setIsLoaded(true);

    const handleResize = () => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onClick);
      try {
        scene.clear();
        geometry.dispose();
        wireframeMaterial.dispose();
        glowMaterial.dispose();
        spriteMaterial.dispose();
        spriteTexture.dispose();
      } catch {}
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 overflow-y-auto overflow-x-hidden">
      {/* Galaxy Background */}
      <div className="fixed inset-0 opacity-70 pointer-events-none">
        <div className="galaxy-bg w-full h-full"></div>
      </div>

      {/* Floating dots */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start text-white text-center px-4 pt-4">
        <div className="mb-20">
          <p className="text-lg text-gray-300 tracking-wider">ATEN VENTURES</p>
        </div>

        <div className="mb-5">
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent max-w-4xl">
            Blueprints to make any business AI-first
          </h1>
        </div>

        {/* Globe */}
        <div className="w-72 h-40 relative z-20">
          <div ref={mountRef} className="absolute inset-0" />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-blue-400 animate-pulse">Loading...</div>
            </div>
          )}
        </div>

        {/* Colosseum */}
        <div className="mb-4 relative w-full max-w-2xl">
          <div className="w-full h-full flex items-center justify-center">
            <img src="/colosseum.png" alt="Colosseum" className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-contain" />
          </div>
        </div>

        {/* Timeline (vertical on mobile, horizontal on md+) */}
        <YearRail years={['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025']} className="mt-4 md:mt-6" />

        {/* Buttons */}
        <div className="flex gap-6 mt-8 md:mt-20 mb-10">
          <button
            onClick={() => { window.location.href = 'https://tidycal.com/zkagi/blueprint-call'; }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            Book a call
          </button>

          <button
            onClick={() => {
              setShowBlueprints(!showBlueprints);
              if (!showBlueprints) {
                setTimeout(() => {
                  if (scrollRef.current) {
                    const yOffset = -100;
                    const el = scrollRef.current;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }, 150);
              }
            }}
            className="px-8 py-3 border border-blue-400 rounded-lg hover:bg-blue-400/20 transition-all font-semibold"
          >
            {showBlueprints ? 'Hide Blueprints' : 'Choose Your Blueprint'}
          </button>
        </div>

        {/* Scroll panel */}
        <div ref={scrollRef} className="w-full">
          <ScrollPanel open={showBlueprints} imageUrl="./scroll-full.png" className="mb-20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                Aten Ventures Blueprint Catalog
              </h1>
              <p className="text-cyan-200 text-lg mt-2">For Real Builders</p>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-gray-300">
              Welcome to the Temple. Below are the blueprints for founders and teams who want to build AI-first companies – without the fluff, jargon, or consultants who've never touched a repo.
            </p>

            <div className="space-y-8">
              {/* sections (unchanged) */}
            <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🔥 The Venture Blueprint (Master Blueprint)</h2>
                 <p className="mb-3 text-gray-300">Everything you need to go from Zero → Revenue → Funded.</p>
                 <p className="mb-3 italic text-purple-300">Perfect if you're starting up, pivoting, or tired of hopping on 100 Discords a day hoping alpha finds you.</p>
                 <div className="ml-6 mb-3">
                   <p className="font-semibold mb-2 text-cyan-200">Includes:</p>
                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
                     <li>GTM strategy that actually fits your niche & budget</li>
                     <li>Tech plan: AI, dev stack, infra, build-or-buy decisions</li>
                     <li>Fundraising prep: deck, narrative, targets</li>
                     <li>Compliance & structuring sanity (without legalese overdose)</li>
                   </ul>
                 </div>
                 <p className="text-sm text-cyan-200">📦 Output: Custom 10–15 page doc + roadmap + 2 calls</p>
                 <p className="text-sm font-bold text-purple-300">💸 $3,500 (lite version) → $7,500+ (custom deep-dive)</p>
                 <p className="text-sm text-cyan-200">🛠 Execution available milestone-by-milestone</p>
               </div>

               {/* GTM Blueprint */}
               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🚀 GTM Blueprint</h2>
                 <p className="mb-3 italic text-purple-300">Because "build it and they will come" only works in movies.</p>
                 <div className="ml-6 mb-3">
                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
                     <li>ICP clarity & sharp positioning</li>
                     <li>Channel & budget-tested launch plan</li>
                     <li>Messaging so tight your users will tattoo it</li>
                   </ul>
                 </div>
                 <p className="text-sm text-cyan-200">📦 Output: GTM doc + metrics dashboard starter</p>
                 <p className="text-sm font-bold text-purple-300">💸 $1,500–$3,000</p>
               </div>

               {/* Tech Blueprint */}
               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🧠 Tech Blueprint</h2>
                 <p className="mb-3 italic text-purple-300">"Should we use ChatGPT or build our own model?" We answer that + more.</p>
                 <div className="ml-6 mb-3">
                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
                     <li>MVP scope that won't bankrupt you</li>
                     <li>AI-infra plan that scales</li>
                     <li>Dev architecture that won't need to be rewritten every 3 months</li>
                   </ul>
                 </div>
                 <p className="text-sm text-cyan-200">📦 Output: MVP + infra plan + TDD-ready build roadmap</p>
                 <p className="text-sm font-bold text-purple-300">💸 $2,500–$5,000</p>
               </div>

               {/* Fundraising Blueprint */}
               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">💼 Fundraising Blueprint</h2>
                 <p className="mb-3 italic text-purple-300">"So…what do VCs actually want?"</p>
                 <div className="ml-6 mb-3">
                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
                     <li>Polished deck & narrative</li>
                     <li>Custom investor list</li>
                     <li>Financials that don't look made up</li>
                     <li>Intro support if aligned</li>
                   </ul>
                 </div>
                 <p className="text-sm text-cyan-200">📦 Output: Pitch kit + data room checklist + mock Q&A</p>
                 <p className="text-sm font-bold text-purple-300">💸 $1,500–$4,000 (Equity or kicker negotiable)</p>
               </div>

               {/* Compliance Blueprint */}
               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">⚖️ Compliance Blueprint</h2>
                 <p className="mb-3 italic text-purple-300">So you don't get fined into oblivion.</p>
                 <div className="ml-6 mb-3">
                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
                     <li>Regulatory checklist (GDPR, AML, AI laws, etc.)</li>
                     <li>Market entry structuring options</li>
                     <li>Policies, docs, setup plan</li>
                   </ul>
                 </div>
                 <p className="text-sm text-cyan-200">📦 Output: Notion-ready compliance plan</p>
                 <p className="text-sm font-bold text-purple-300">💸 $1,200–$3,000</p>
               </div>

               {/* AI Integration Blueprint */}
               <div className="border-b-2 border-cyan-400/30 pb-6 hover:bg-white/5 transition-colors rounded-lg p-4 text-left">
                 <h2 className="text-2xl font-bold mb-3 text-cyan-300">🤖 AI Integration Blueprint (for Enterprises)</h2>
                 <p className="mb-3 italic text-purple-300">How to go from "we should use AI" → "we 10x'd ops with AI."</p>
                 <div className="ml-6 mb-3">
                   <p className="font-semibold mb-2 text-cyan-200">You get:</p>
                   <ul className="list-disc ml-6 space-y-1 text-gray-300">
                     <li>Internal use-case map</li>
                     <li>Pilot rollout plan</li>
                     <li>Tool, model, talent map</li>
                     <li>Governance & ROI metrics</li>
                   </ul>
                 </div>
                 <p className="text-sm text-cyan-200">📦 Output: Executive-ready AI roadmap</p>
                 <p className="text-sm font-bold text-purple-300">💸 $5,000–$15,000+</p>
               </div>

               {/* Footer */}
               <div className="mt-12 pt-8 border-t-2 border-cyan-400/50 text-left">
                 <p className="mb-4 text-lg text-gray-300">
                   We built this because we've been there. Bootstrapped, blown up portfolios, helped scale 7-figure products. We're not McKinsey. We're not chatbots. We're operators who help you build real s*** that ships.
                 </p>
                 <p className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                   Let's make something incredible.
                 </p>
                <p className="text-center text-lg font-bold text-cyan-300">
   <a
     href="https:tidycal.com/zkagi/blueprint-call"
     target="_blank"
     rel="noopener noreferrer"
     className="hover:underline"
   >
     🪷 Book a Blueprint Call
   </a>
 </p>

               </div>
             </div>

             {/* Aten Ventures Entities */}
 <div className="mt-12 pt-8 border-t-2 border-cyan-400/50">
   <details className="group">
     <summary className="cursor-pointer text-cyan-300 text-lg font-semibold hover:text-purple-300 transition-colors">
       More About Aten Ventures Group
     </summary>
     <div className="mt-4 space-y-2 text-gray-300 text-sm">
       <p><span className="font-bold text-cyan-200">Aten Ventures LLC</span> (USA)</p>
       <p><span className="font-bold text-cyan-200">Aten Ventures Studio Pte. Ltd.</span> (Singapore)</p>
       <p><span className="font-bold text-cyan-200">“MB” Bitbaza</span> (Lithuania)</p>
       <p><span className="font-bold text-cyan-200">ML BIZ LLP</span> (India)</p>

       <div className="pt-4">
         <p className="font-bold text-cyan-200">📬 Mailing Address:</p>
         <p>620 S 7th St, PMB 1968</p>
         <p>Nevada, Las Vegas, 89101</p>
         <p>United States</p>
       </div>
     </div>
   </details>
 </div>

          </ScrollPanel>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .galaxy-bg {
          background: radial-gradient(
            ellipse at center,
            rgba(30, 58, 138, 0.4) 0%,
            rgba(15, 23, 42, 0.8) 50%,
            rgba(2, 6, 23, 1) 100%
          );
          position: relative;
        }
        .galaxy-bg::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,.5), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(147,197,253,.4), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(167,139,250,.3), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(96,165,250,.2), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,.4), transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: galaxyMove 20s linear infinite;
        }
        @keyframes galaxyMove { from { transform: translateY(0px); } to { transform: translateY(-100px); } }
        @keyframes twinkle { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .scrollbar-thin::-webkit-scrollbar { width: 8px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: rgba(30,58,138,.3); border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(6,182,212,.7); border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,.9); }
      `}</style>

      {/* Footer */}
      <footer className="w-full mt-16 mb-2 border-t border-cyan-400/40">
        <div className="mx-auto max-w-screen-2xl px-4 py-6 pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://www.linkedin.com/in/surajvenkat" target="_blank" rel="noopener noreferrer">LinkedIn (Suraj Venkat)</a>
            <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://www.linkedin.com/company/aten-ventures-studio/" target="_blank" rel="noopener noreferrer">LinkedIn (Aten Ventures Studio)</a>
            <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://x.com/atenkrotos" target="_blank" rel="noopener noreferrer">X (Aten Krotos)</a>
            <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://x.com/atenventures" target="_blank" rel="noopener noreferrer">X (Aten Ventures)</a>
            <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://surajvenkat.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a>
            <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://youtube.com/@decodingventure?feature=shared" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GalaxyGlobe;
