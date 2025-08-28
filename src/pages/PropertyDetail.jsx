// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// import { ArrowLeft, Share2, Heart } from "lucide-react";

// import PropertyHero from "../components/PropertyHero";
// import ExecutiveSnapshot from "../components/ExecutiveSnapshot";
// import VisualShowcase from "../components/VisualShowcase";
// import MarketContext from "../components/MarketContext";
// import Financials from "../components/Financials";
// import OwnershipModel from "../components/OwnershipModel";
// import ManagementFees from "../components/ManagementFees";
// import ExitLiquidity from "../components/ExitLiquidity";
// import RiskFactors from "../components/RiskFactors";
// import ClosingCTA from "../components/ClosingCTA";

// /** ---------- HEADER ---------- */
// function PropertyHeader({ property, onBack }) {
//   return (
//     <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-sm border-b border-white/10">
//       {/* ⬇️ Narrow on mobile, wide again on lg+ */}
//       <div className="mx-auto w-full max-w-3xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] px-4 lg:px-6 xl:px-8 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onBack}
//             className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//             aria-label="Back"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div className="min-w-0">
//             <h1 className="text-xl font-bold truncate">{property?.projectTitle}</h1>
//             <p className="text-sm text-white/60 truncate">{property?.location}</p>
//           </div>
//         </div>
// {/* 
//         <div className="flex items-center gap-2">
//           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Favorite">
//             <Heart className="w-5 h-5" />
//           </button>
//           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Share">
//             <Share2 className="w-5 h-5" />
//           </button>
//         </div> */}
//       </div>
//     </header>
//   );
// }

// /** ---------- PAGE ---------- */
// export default function PropertyDetailPage() {
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { slug } = useParams();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const propertyId = searchParams.get("id");

//   useEffect(() => {
//     if (propertyId !== null) {
//       fetchPropertyDetails(propertyId);
//     } else {
//       setError("Property ID not found in URL");
//       setLoading(false);
//     }
//   }, [propertyId]);

//   const fetchPropertyDetails = async (id) => {
//     try {
//       const response = await fetch("https://zynapse.zkagi.ai/listings", {
//         headers: { "Content-Type": "application/json", "api-key": "zk-123321" },
//       });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       const allListings = await response.json();
//       const foundProperty = Array.isArray(allListings)
//         ? allListings[parseInt(id, 10)]
//         : null;

//       if (!foundProperty) throw new Error(`Property not found at index ${id}`);
//       setProperty(foundProperty);
//     } catch (err) {
//       setError(err.message || "Failed to fetch property details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => navigate(-1);

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full bg-black text-white flex items-center justify-center overflow-x-hidden">
//         <div className="text-white/80 text-xl">Loading property details...</div>
//       </div>
//     );
//   }

//   if (error || !property) {
//     return (
//       <div className="min-h-screen w-full bg-black text-white flex items-center justify-center overflow-x-hidden">
//         <div className="text-center px-6">
//           <h2 className="text-2xl font-bold text-red-400 mb-4">Property Not Found</h2>
//           <p className="text-white/70 mb-6">{error || "The requested property could not be found."}</p>
//           <div className="flex gap-4 justify-center">
//             <button
//               onClick={handleBack}
//               className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
//             >
//               Go Back
//             </button>
//             <button
//               onClick={() => navigate("/ecoluxury/listings")}
//               className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors"
//             >
//               View All Properties
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
//       <PropertyHeader property={property} onBack={handleBack} />

//       {/* Page container: mobile clamp; desktop wide */}
//       <main className="w-full pb-20">
//         <div className="mx-auto w-full max-w-3xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] px-4 lg:px-6 xl:px-8">
//           {/* Each section kept safe; wide components can breathe on lg+ */}
//           <section className="w-full overflow-x-hidden">
//             <PropertyHero property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <ExecutiveSnapshot property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <VisualShowcase property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <MarketContext property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <Financials property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <OwnershipModel property={property} />
//           </section>

//           {/* <section className="w-full overflow-x-hidden">
//             <ManagementFees property={property} />
//           </section> */}

//           <section className="w-full overflow-x-hidden">
//             <ExitLiquidity property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <RiskFactors property={property} />
//           </section>

//           {/* <section className="w-full overflow-x-hidden">
//             <ClosingCTA property={property} />
//           </section> */}

//             <footer className="w-full mt-16 mb-2 border-t border-cyan-400/40">
//         <div className="mx-auto max-w-screen-2xl px-4 py-6 pb-[env(safe-area-inset-bottom)]">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
//             <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://www.linkedin.com/in/surajvenkat" target="_blank" rel="noopener noreferrer">LinkedIn (Suraj Venkat)</a>
//             <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://www.linkedin.com/company/aten-ventures-studio/" target="_blank" rel="noopener noreferrer">LinkedIn (Aten Ventures Studio)</a>
//             <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://x.com/atenkrotos" target="_blank" rel="noopener noreferrer">X (Aten Krotos)</a>
//             <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://x.com/atenventures" target="_blank" rel="noopener noreferrer">X (Aten Ventures)</a>
//             <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://surajvenkat.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a>
//             <a className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition" href="https://youtube.com/@decodingventure?feature=shared" target="_blank" rel="noopener noreferrer">YouTube</a>
//           </div>
//         </div>
//       </footer>
//         </div>
//       </main>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// import { ArrowLeft, Share2, Heart, ArrowRight } from "lucide-react";

// import PropertyHero from "../components/PropertyHero";
// import ExecutiveSnapshot from "../components/ExecutiveSnapshot";
// import VisualShowcase from "../components/VisualShowcase";
// import MarketContext from "../components/MarketContext";
// import Financials from "../components/Financials";
// import OwnershipModel from "../components/OwnershipModel";
// import ManagementFees from "../components/ManagementFees";
// import ExitLiquidity from "../components/ExitLiquidity";
// import RiskFactors from "../components/RiskFactors";
// import ClosingCTA from "../components/ClosingCTA";

// /** ---------- HEADER ---------- */
// function PropertyHeader({ property, onBack }) {
//   return (
//     <header className="sticky top-0 z-50 w-full bg-[#091020] backdrop-blur-sm border-b border-white/10">
//       {/* ⬇️ Narrow on mobile, wide again on lg+ */}
//       <div className="mx-auto w-full max-w-3xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] px-4 lg:px-6 xl:px-8 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onBack}
//             className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//             aria-label="Back"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div className="min-w-0">
//             <h1 className="text-xl font-bold truncate">{property?.projectTitle}</h1>
//             <p className="text-sm text-white/60 truncate">{property?.location}</p>
//           </div>
//         </div>

//         {/* optional actions
//         <div className="flex items-center gap-2">
//           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Favorite">
//             <Heart className="w-5 h-5" />
//           </button>
//           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Share">
//             <Share2 className="w-5 h-5" />
//           </button>
//         </div> */}
//       </div>
//     </header>
//   );
// }

// /** ---------- PAGE ---------- */
// export default function PropertyDetailPage() {
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { slug } = useParams();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const propertyId = searchParams.get("id");

//   useEffect(() => {
//     if (propertyId !== null) {
//       fetchPropertyDetails(propertyId);
//     } else {
//       setError("Property ID not found in URL");
//       setLoading(false);
//     }
//   }, [propertyId]);

//   const fetchPropertyDetails = async (id) => {
//     try {
//       const response = await fetch("https://zynapse.zkagi.ai/listings", {
//         headers: { "Content-Type": "application/json", "api-key": "zk-123321" },
//       });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       const allListings = await response.json();
//       const foundProperty = Array.isArray(allListings)
//         ? allListings[parseInt(id, 10)]
//         : null;

//       if (!foundProperty) throw new Error(`Property not found at index ${id}`);
//       setProperty(foundProperty);
//     } catch (err) {
//       setError(err.message || "Failed to fetch property details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => navigate(-1);

//   // smooth scroll to Ownership Model section
//   const scrollIntoOwnership = () => {
//     const el = document.getElementById("ownership-model");
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full bg-black text-white flex items-center justify-center overflow-x-hidden">
//         <div className="text-white/80 text-xl">Loading property details...</div>
//       </div>
//     );
//   }

//   if (error || !property) {
//     return (
//       <div className="min-h-screen w-full bg-black text-white flex items-center justify-center overflow-x-hidden">
//         <div className="text-center px-6">
//           <h2 className="text-2xl font-bold text-red-400 mb-4">Property Not Found</h2>
//           <p className="text-white/70 mb-6">{error || "The requested property could not be found."}</p>
//           <div className="flex gap-4 justify-center">
//             <button
//               onClick={handleBack}
//               className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
//             >
//               Go Back
//             </button>
//             <button
//               onClick={() => navigate("/ecoluxury/listings")}
//               className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors"
//             >
//               View All Properties
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const scrollIntoFinancials = () => {
//   const el = document.getElementById("financial-overview");
//   if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
// };


//   return (
//     <div className="w-full min-h-screen bg-[#091020] text-white overflow-x-hidden">
//       <PropertyHeader property={property} onBack={handleBack} />

//       {/* Page container: mobile clamp; desktop wide */}
//       <main className="w-full">
//         <div className="mx-auto w-full max-w-3xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] px-4 lg:px-6 xl:px-8">
//           {/* Each section kept safe; wide components can breathe on lg+ */}
//           <section className="w-full overflow-x-hidden">
//             <PropertyHero property={property} onViewDetails={scrollIntoFinancials} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <ExecutiveSnapshot property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <VisualShowcase property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <MarketContext property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden"  id="financial-overview">
//             <Financials property={property} />
//           </section>

//           {/* give the target an id and scroll margin top so the sticky header doesn't cover it */}
//           <section
//             id="ownership-model"
//             className="w-full overflow-x-hidden scroll-mt-24 md:scroll-mt-28"
//           >
//             <OwnershipModel property={property} />
//           </section>

//           {/* <section className="w-full overflow-x-hidden">
//             <ManagementFees property={property} />
//           </section> */}

//           <section className="w-full overflow-x-hidden">
//             <ExitLiquidity property={property} />
//           </section>

//           <section className="w-full overflow-x-hidden">
//             <RiskFactors property={property} />
//           </section>

//           {/* ------- pre-footer CTA that jumps to Ownership Model ------- */}
//           <section className="w-full overflow-x-hidden mt-10 sm:mt-14">
//             <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
//               <h3 className="text-2xl sm:text-3xl font-bold mb-2">
//                 See exactly how ownership works
//               </h3>
//               <p className="text-white/70 max-w-2xl mx-auto mb-6">
//                 SPV structure, share classes, caps, and investor protections.
//               </p>
//               <button
//                 onClick={scrollIntoOwnership}
//                 className="inline-flex items-center justify-center gap-2 bg-[#af89fb] hover:bg-[#af89fb]/20 text-whiite font-bold px-6 py-3 rounded-lg transition-colors"
//               >
//                 Checkout Now
//                 <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>
//           </section>

//           {/* Footer */}
//           <footer className="w-full mt-16 border-t border-cyan-400/40">
//             <div className="mx-auto max-w-screen-2xl p-4 pb-[env(safe-area-inset-bottom)]">
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
//                 <a
//                   className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//                   href="https://www.linkedin.com/in/surajvenkat"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   LinkedIn (Suraj Venkat)
//                 </a>
//                 <a
//                   className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//                   href="https://www.linkedin.com/company/aten-ventures-studio/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   LinkedIn (Aten Ventures Studio)
//                 </a>
//                 <a
//                   className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//                   href="https://x.com/atenkrotos"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   X (Aten Krotos)
//                 </a>
//                 <a
//                   className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//                   href="https://x.com/atenventures"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   X (Aten Ventures)
//                 </a>
//                 <a
//                   className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//                   href="https://surajvenkat.medium.com/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Medium
//                 </a>
//                 <a
//                   className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
//                   href="https://youtube.com/@decodingventure?feature=shared"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   YouTube
//                 </a>
//               </div>
//               <div className="mt-3 flex justify-center">
//       <a
//         href="https://docs.google.com/document/d/1uNbkhAWfjIXzXFJF5a-aOuoMXkCqguK1jgeQFmY1sPc/edit?usp=sharing"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-flex items-center gap-2 r underline text-white px-4 py-2 text-sm transition-colors"
//       >
//         Terms & Conditions
     
//       </a>
//     </div>
//             </div>
//           </footer>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import PropertyHero from "../components/PropertyHero";
import ExecutiveSnapshot from "../components/ExecutiveSnapshot";
import KeyFactsFromDescription from "../components/KeyFactsFromDescription";
import VisualShowcase from "../components/VisualShowcase";
import MarketContext from "../components/MarketContext";
import Financials from "../components/Financials";
import OwnershipModel from "../components/OwnershipModel";
import ExitLiquidity from "../components/ExitLiquidity";
import RiskFactors from "../components/RiskFactors";
import StarfieldBackground from "../components/StarfieldBackground"; // <-- add this import

/** ---------- HEADER ---------- */
function PropertyHeader({ property, onBack }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#091020]/80 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto w-full max-w-3xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] px-4 lg:px-6 xl:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold truncate">{property?.projectTitle}</h1>
            <p className="text-sm text-white/60 truncate">{property?.location}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

/** ---------- PAGE ---------- */
export default function PropertyDetailPage() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const propertyId = searchParams.get("id");

  useEffect(() => {
    if (propertyId !== null) fetchPropertyDetails(propertyId);
    else { setError("Property ID not found in URL"); setLoading(false); }
  }, [propertyId]);

  const fetchPropertyDetails = async (id) => {
    try {
      const response = await fetch("https://zynapse.zkagi.ai/listings", {
        headers: { "Content-Type": "application/json", "api-key": "zk-123321" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const all = await response.json();
      const found = Array.isArray(all) ? all[parseInt(id, 10)] : null;
      if (!found) throw new Error(`Property not found at index ${id}`);
      setProperty(found);
    } catch (err) {
      setError(err.message || "Failed to fetch property details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate(-1);

  const scrollIntoOwnership = () => {
    const el = document.getElementById("ownership-model");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollIntoFinancials = () => {
    const el = document.getElementById("financial-overview");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="relative min-h-screen w-full text-white flex items-center justify-center overflow-x-hidden">
        <StarfieldBackground />  {/* global galaxy while loading */}
        <div className="relative z-10 text-white/80 text-xl">Loading property details...</div>
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error || !property) {
    return (
      <div className="relative min-h-screen w-full text-white flex items-center justify-center overflow-x-hidden">
        <StarfieldBackground />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Property Not Found</h2>
          <p className="text-white/70 mb-6">{error || "The requested property could not be found."}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleBack} className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-6 py-3 rounded-lg transition-colors">Go Back</button>
            <button onClick={() => navigate("/ecoluxury/listings")} className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors">View All Properties</button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- NORMAL PAGE ---------- */
  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* ★ Galaxy + stars behind EVERYTHING on the page */}
      <StarfieldBackground />

      {/* Foreground content */}
      <div className="relative z-10 surface-reset">
        <PropertyHeader property={property} onBack={handleBack} />

        <main className="w-full">
          <div className="mx-auto w-full max-w-3xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] px-4 lg:px-6 xl:px-8">
            <section className="w-full overflow-x-hidden">
              <PropertyHero property={property} onViewDetails={scrollIntoFinancials} />
            </section>

            <section className="w-full overflow-x-hidden">
              <ExecutiveSnapshot property={property} />
            </section>

            <section className="w-full overflow-x-hidden">
  <KeyFactsFromDescription description={property?.description || ""} />
</section>

            <section className="w-full overflow-x-hidden">
              <VisualShowcase property={property} />
            </section>

            <section className="w-full overflow-x-hidden">
              <MarketContext property={property} />
            </section>

            <section className="w-full overflow-x-hidden" id="financial-overview">
              <Financials property={property} />
            </section>

            <section id="ownership-model" className="w-full overflow-x-hidden scroll-mt-24 md:scroll-mt-28">
              <OwnershipModel property={property} />
            </section>

            <section className="w-full overflow-x-hidden">
              <ExitLiquidity property={property} />
            </section>

            <section className="w-full overflow-x-hidden">
              <RiskFactors property={property} />
            </section>

            <section className="w-full overflow-x-hidden mt-10 sm:mt-14">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">See exactly how ownership works</h3>
                <p className="text-white/70 max-w-2xl mx-auto mb-6">
                  SPV structure, share classes, caps, and investor protections.
                </p>
                <button onClick={scrollIntoOwnership} className="inline-flex items-center justify-center gap-2 bg-[#af89fb] hover:bg-[#af89fb]/20 text-whiite font-bold px-6 py-3 rounded-lg transition-colors">
                  Checkout Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </section>

             <footer className="w-full mt-16 border-t border-cyan-400/40">
            <div className="mx-auto max-w-screen-2xl p-4 pb-[env(safe-area-inset-bottom)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <a
                  className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
                  href="https://www.linkedin.com/in/surajvenkat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn (Suraj Venkat)
                </a>
                <a
                  className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
                  href="https://www.linkedin.com/company/aten-ventures-studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn (Aten Ventures Studio)
                </a>
                <a
                  className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
                  href="https://x.com/atenkrotos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Aten Krotos)
                </a>
                <a
                  className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
                  href="https://x.com/atenventures"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Aten Ventures)
                </a>
                <a
                  className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
                  href="https://surajvenkat.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Medium
                </a>
                <a
                  className="block rounded-lg border-cyan-400/30 px-3 py-3 text-center text-sm text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
                  href="https://youtube.com/@decodingventure?feature=shared"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </div>
              <div className="mt-3 flex justify-center">
      <a
        href="https://docs.google.com/document/d/1uNbkhAWfjIXzXFJF5a-aOuoMXkCqguK1jgeQFmY1sPc/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 r underline text-white px-4 py-2 text-sm transition-colors"
      >
        Terms & Conditions
     
      </a>
    </div>
            </div>
          </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
