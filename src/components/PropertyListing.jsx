// import React, { useEffect, useMemo, useState } from "react";
// import { MapPin, TrendingUp, Home, Check } from "lucide-react";

// /** ---------- CONFIG: fallback hero when there are no listings ---------- */
// const FALLBACK_HERO = {
//   projectTitle: "PHUKET VILLA",
//   startingInvestment: 300,
//   roiRange: "12–18%",
//   location: "Bang Tao, Phuket",
//   propertyType: "2BR Pool Villa",
//   mainImage:
//     "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
//   buyUrl: "#",
//   detailsUrl: "#",
// };

// /** ---------- GOOGLE DRIVE PROXY CONVERTER ---------- */
// function convertToProxyUrl(url) {
//   if (!url || !url.includes('drive.google.com')) {
//     return url; // Return as-is if not a Google Drive URL
//   }

//   // Extract file ID from various Google Drive URL formats
//   let fileId = null;
  
//   const fileIdMatch1 = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
//   const fileIdMatch2 = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  
//   if (fileIdMatch1) {
//     fileId = fileIdMatch1[1];
//   } else if (fileIdMatch2) {
//     fileId = fileIdMatch2[1];
//   }

//   if (fileId) {
//     // Use a CORS proxy service to fetch Google Drive images
//     const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    
//     // Multiple proxy options - try them in order
//     const proxyServices = [
//       `https://cors-anywhere.herokuapp.com/${driveUrl}`,
//       `https://api.allorigins.win/raw?url=${encodeURIComponent(driveUrl)}`,
//       `https://corsproxy.io/?${encodeURIComponent(driveUrl)}`,
//       // Fallback to direct attempt
//       driveUrl
//     ];
    
//     return {
//       fileId,
//       originalUrl: driveUrl,
//       proxyUrls: proxyServices
//     };
//   }

//   return url;
// }

// /** ---------- SMART PROXY IMAGE COMPONENT ---------- */
// function ProxyImage({ src, alt, className, onLoad, onError }) {
//   const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
  
//   const urlInfo = useMemo(() => convertToProxyUrl(src), [src]);
  
//   // If not a Google Drive URL, use regular img
//   if (typeof urlInfo === 'string') {
//     return (
//       <img
//         src={urlInfo}
//         alt={alt}
//         className={className}
//         onLoad={() => {
//           setIsLoading(false);
//           onLoad && onLoad();
//         }}
//         onError={() => {
//           setIsLoading(false);
//           setHasError(true);
//           onError && onError();
//         }}
//       />
//     );
//   }

//   const currentUrl = urlInfo.proxyUrls[currentUrlIndex] || urlInfo.originalUrl;

//   const handleImageLoad = () => {
//     setIsLoading(false);
//     setHasError(false);
//     console.log(`✅ Image loaded via proxy ${currentUrlIndex + 1}:`, currentUrl);
//     onLoad && onLoad();
//   };

//   const handleImageError = () => {
//     if (currentUrlIndex < urlInfo.proxyUrls.length - 1) {
//       console.log(`🔄 Proxy ${currentUrlIndex + 1} failed, trying proxy ${currentUrlIndex + 2}...`);
//       setCurrentUrlIndex(prev => prev + 1);
//     } else {
//       setIsLoading(false);
//       setHasError(true);
//       console.log('❌ All proxy attempts failed');
//       onError && onError();
//     }
//   };

//   return (
//     <div className="relative">
//       <img
//         src={currentUrl}
//         alt={alt}
//         className={className}
//         onLoad={handleImageLoad}
//         onError={handleImageError}
//         crossOrigin="anonymous"
//       />
      
//       {isLoading && (
//         <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
//           <div className="text-white/60 text-center">
//             <div className="text-sm">Loading from Google Drive...</div>
//             <div className="text-xs mt-1">Proxy {currentUrlIndex + 1} of {urlInfo.proxyUrls?.length || 1}</div>
//           </div>
//         </div>
//       )}
      
//       {hasError && (
//         <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
//           <div className="text-white/80 text-center px-4">
//             <div className="text-sm mb-2">⚠️ Google Drive Image Failed</div>
//             <div className="text-xs opacity-75">
//               FileID: {urlInfo.fileId?.substring(0, 8)}...
//               <br />
//               Check sharing permissions
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function PropertyLanding() {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch("https://zynapse.zkagi.ai/listings", {
//           cache: "no-store",
//           headers: {
//             "Content-Type": "application/json",
//             "api-key": "zk-123321",
//           },
//         });

//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setListings(Array.isArray(data) ? data : []);
//       } catch (e) {
//         setErr(e?.message || "Failed to fetch listings");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const featured = useMemo(
//     () => (listings && listings.length ? listings[0] : null),
//     [listings]
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-white/80 text-xl">Loading luxury properties…</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header */}
//       <header className="container mx-auto px-4 py-6 flex items-center justify-between">
//         <div className="text-2xl font-bold tracking-wide">△ ATEN</div>
//         <button className="bg-white/10 px-6 py-2 rounded-lg border border-white/20">Menu</button>
//       </header>

//       {/* ===== HERO always visible ===== */}
//       <Hero listing={featured || FALLBACK_HERO} isFallback={!featured} />

//       {/* ===== BOTTOM LIST / EMPTY STATE ===== */}
//       <section className="container mx-auto px-4 pt-12 pb-24">
//         {err && (
//           <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-200">
//             {String(err)}
//           </div>
//         )}

//         {listings.length > 0 ? (
//           <>
//             <h2 className="text-2xl md:text-3xl font-serif mb-6">Explore Blueprints</h2>
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//               {listings.map((l, i) => (
//                 <PropertyCard key={`${l.projectTitle}-${i}`} listing={l} />
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
//             <h3 className="text-xl font-semibold mb-2">No live blueprints right now</h3>
//             <p className="text-white/70">
//               Join our investor club to get first access when new eco-luxury deals drop.
//             </p>
//             <a
//               href="#"
//               className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg"
//             >
//               Join Investor Club
//             </a>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// /* ---------------- HERO WITH PROXY ---------------- */
// function Hero({ listing, isFallback }) {
//   const firstGallery = listing?.galleryImages
//     ? listing.galleryImages.split(",")[0]?.trim()
//     : null;
//   const rawCover = firstGallery || listing?.mainImage || "/placeholder-villa.jpg";

//   return (
//     <section className="relative">
//       <div className="h-[70vh] md:h-[78vh] relative rounded-3xl overflow-hidden container mx-auto px-4">
//         <ProxyImage
//           src={rawCover}
//           alt={listing?.projectTitle}
//           className="absolute inset-0 w-full h-full object-cover"
//           onLoad={() => console.log('✅ Hero image loaded successfully')}
//           onError={() => console.log('⚠️ Hero image failed to load')}
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
//         <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />

//         {/* Content */}
//         <div className="relative z-10 h-full flex items-end">
//           <div className="p-6 md:p-12 max-w-2xl">
//             <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
//               Aten Ventures Exclusive
//             </div>
//             <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
//               ECO-LUXURY BLUEPRINT: <br /> {listing?.projectTitle}
//             </h1>
//             <div className="text-white/80 mb-6">
//               From ${listing?.startingInvestment} · {listing?.roiRange || "—"} ROI
//             </div>

//             {/* stat pills */}
//             <div className="flex flex-wrap gap-2 mb-6">
//               {listing?.location && <Pill icon={<MapPin className="w-4 h-4" />} label={listing.location} />}
//               {listing?.roiRange && (
//                 <Pill icon={<TrendingUp className="w-4 h-4" />} label={`${listing.roiRange} modeled ROI`} />
//               )}
//               {listing?.propertyType && <Pill icon={<Home className="w-4 h-4" />} label={listing.propertyType} />}
//             </div>

//             {/* highlights */}
//             <ul className="space-y-2 mb-8">
//               {[
//                 "AI-powered ROI modeling",
//                 "Heat reuse & sustainable integration",
//                 "Legally structured SPV (Singapore/BVI)",
//                 "Aten Ventures deal flow",
//               ].map((h, i) => (
//                 <li key={i} className="flex items-center gap-2 text-white/80">
//                   <Check className="w-4 h-4 text-green-400" />
//                   <span>{h}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* CTAs */}
//             <div className="flex flex-wrap items-center gap-3">
//               <a
//                 href={listing?.buyUrl || "#"}
//                 className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg"
//               >
//                 {isFallback ? "JOIN THE WAITLIST" : "BUY BLUEPRINT"}
//               </a>
//               <a
//                 href={listing?.detailsUrl || "#"}
//                 className="border border-white/30 hover:border-white/60 px-6 py-3 rounded-lg"
//               >
//                 {isFallback ? "View Sample Blueprint" : "View Full Blueprint"}
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Pill({ icon, label }) {
//   return (
//     <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-sm">
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// }

// function PriceCard({ tier, price, note }) {
//   return (
//     <div className="bg-white/5 rounded-2xl border border-white/10 p-5 text-center">
//       <div className="text-xl font-serif mb-1">{tier}</div>
//       <div className="text-3xl font-bold mb-1">${price}</div>
//       <div className="text-white/70 text-sm">{note}</div>
//     </div>
//   );
// }

// /* ---------------- PROPERTY CARD WITH PROXY ---------------- */
// function PropertyCard({ listing }) {
//   const [idx, setIdx] = useState(0);
  
//   const images = []
//     .concat(
//       listing?.galleryImages
//         ? listing.galleryImages
//             .split(",")
//             .map((u) => u.trim())
//             .filter(Boolean)
//         : []
//     )
//     .concat(listing?.mainImage ? [listing.mainImage] : []);
    
//   const shown = images.length ? images[idx % images.length] : "/placeholder-villa.jpg";

//   return (
//     <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
//       <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setIdx((p) => p + 1)}>
//         <ProxyImage
//           src={shown}
//           alt={listing?.projectTitle}
//           className="w-full h-full object-cover"
//           onLoad={() => console.log('✅ Property card image loaded')}
//           onError={() => console.log('⚠️ Property card image failed')}
//         />
//         {images.length > 1 && (
//           <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-xs">
//             {(idx % images.length) + 1}/{images.length}
//           </div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
//       </div>

//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-bold">{listing?.projectTitle}</h3>
//           {listing?.status && (
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 listing.status === "Available"
//                   ? "bg-green-500/20 text-green-400"
//                   : listing.status === "Coming Soon"
//                   ? "bg-yellow-500/20 text-yellow-400"
//                   : "bg-red-500/20 text-red-400"
//               }`}
//             >
//               {listing.status}
//             </span>
//           )}
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <Info icon={<MapPin className="w-5 h-5 mx-auto mb-1 text-white/60" />} label={listing?.location} />
//           <Info icon={<TrendingUp className="w-5 h-5 mx-auto mb-1 text-white/60" />} label={listing?.roiRange} sub="ROI" />
//           <Info icon={<Home className="w-5 h-5 mx-auto mb-1 text-white/60" />} label={listing?.propertyType} />
//         </div>

//         {listing?.description && (
//           <p className="text-white/70 text-sm mb-6 line-clamp-3">{listing.description}</p>
//         )}

//         <div className="mb-6">
//           <div className="text-sm text-white/60 mb-1">From</div>
//           <div className="text-2xl font-bold">${listing?.startingInvestment}</div>
//           <div className="text-sm text-white/60">Aten Ventures Exclusive</div>
//         </div>

//         <a
//           href={listing?.buyUrl || "#"}
//           className="block w-full text-center bg-yellow-600 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition-colors"
//         >
//           BUY BLUEPRINT
//         </a>
//       </div>
//     </div>
//   );
// }

// function Info({ icon, label, sub }) {
//   return (
//     <div className="text-center">
//       {icon}
//       <div className="text-sm text-white/80">{label || "—"}</div>
//       {sub && <div className="text-xs text-white/60">{sub}</div>}
//     </div>
//   );
// }

// function Tier({ label, value }) {
//   return (
//     <div className="text-center p-2 bg-white/5 rounded">
//       <div className="font-medium">{label}</div>
//       <div className="text-yellow-400">${value}</div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { MapPin, TrendingUp, Home, Check, ArrowRight } from "lucide-react";

/** ---------- CONFIG: fallback hero when there are no listings ---------- */
const FALLBACK_HERO = {
  projectTitle: "PHUKET VILLA",
  startingInvestment: 300,
  roiRange: "12–18%",
  location: "Bang Tao, Phuket",
  propertyType: "2BR Pool Villa",
  mainImage:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
  buyUrl: "#",
  detailsUrl: "#",
};

/** ---------- GOOGLE DRIVE PROXY CONVERTER ---------- */
function convertToProxyUrl(url) {
  if (!url || !url.includes('drive.google.com')) {
    return url;
  }

  let fileId = null;
  const fileIdMatch1 = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  const fileIdMatch2 = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  
  if (fileIdMatch1) {
    fileId = fileIdMatch1[1];
  } else if (fileIdMatch2) {
    fileId = fileIdMatch2[1];
  }

  if (fileId) {
    const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    const proxyServices = [
      `https://cors-anywhere.herokuapp.com/${driveUrl}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(driveUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(driveUrl)}`,
      driveUrl
    ];
    
    return {
      fileId,
      originalUrl: driveUrl,
      proxyUrls: proxyServices
    };
  }

  return url;
}

/** ---------- SMART PROXY IMAGE COMPONENT ---------- */
function ProxyImage({ src, alt, className, onLoad, onError }) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const urlInfo = useMemo(() => convertToProxyUrl(src), [src]);
  
  if (typeof urlInfo === 'string') {
    return (
      <img
        src={urlInfo}
        alt={alt}
        className={className}
        onLoad={() => {
          setIsLoading(false);
          onLoad && onLoad();
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
          onError && onError();
        }}
      />
    );
  }

  const currentUrl = urlInfo.proxyUrls[currentUrlIndex] || urlInfo.originalUrl;

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad && onLoad();
  };

  const handleImageError = () => {
    if (currentUrlIndex < urlInfo.proxyUrls.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      setIsLoading(false);
      setHasError(true);
      onError && onError();
    }
  };

  return (
    <div className="relative">
      <img
        src={currentUrl}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        crossOrigin="anonymous"
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-white/60 text-center">
            <div className="text-sm">Loading...</div>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
          <div className="text-white/80 text-center px-4">
            <div className="text-sm">⚠️ Image Failed</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertyLanding() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://zynapse.zkagi.ai/listings", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "api-key": "zk-123321",
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setListings(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = useMemo(
    () => (listings && listings.length ? listings[0] : null),
    [listings]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/80 text-xl">Loading luxury properties…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}

      
      {/* Section 1: Hero */}
      <HeroSection listing={featured || FALLBACK_HERO} isFallback={!featured} />
      
      {/* Section 2: Highlights with Image Grid */}
      <HighlightsSection />
      
      {/* Section 3: Investment Pathway Timeline */}
      <InvestmentPathwaySection />
      
      {/* Section 4: Price Cards */}
      <PriceCardsSection />
      
      {/* Section 5: Property Listings */}
      <PropertyListingsSection listings={listings} err={err} />
    </div>
  );
}


function HeroSection({ listing, isFallback }) {
  const firstGallery = listing?.galleryImages
    ? listing.galleryImages.split(",")[0]?.trim()
    : null;
  const rawCover = firstGallery || listing?.mainImage || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop";

  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt={listing?.projectTitle || "Hero Background"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col">
        {/* Main Hero Content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-2xl">
            <div className="text-sm uppercase tracking-widest text-white/70 mb-4">
              Aten Ventures Exclusive
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              ECO-LUXURY<br />
              BLUEPRINT:<br />
              <span className="text-yellow-500">{listing?.projectTitle}</span>
            </h1>
            <div className="text-xl text-white/90 mb-8">
              From ${listing?.startingInvestment} | {listing?.roiRange || "12–18%"} ROI
            </div>
            <div className="text-lg text-white/80 mb-8">
              Aten Ventures Exclusive
            </div>
            
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition-colors">
              {isFallback ? "JOIN WAITLIST" : "BUY BLUEPRINT"}
            </button>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <InfoCard 
              icon={<MapPin className="w-6 h-6" />}
              title={listing?.location || "Bang Tao, Phuket"}
              subtitle="Location"
            />
            <InfoCard 
              icon={<TrendingUp className="w-6 h-6" />}
              title={`${listing?.roiRange || "12–18%"}`}
              subtitle="Modeled ROI"
            />
            <InfoCard 
              icon={<Home className="w-6 h-6" />}
              title={listing?.propertyType || "2BR Pool Villa"}
              subtitle="Property Type"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, subtitle }) {
  return (
    <div className="bg-black/60 backdrop-blur border border-white/20 rounded-xl p-6 text-center">
      <div className="text-white/60 mb-2 flex justify-center">{icon}</div>
      <div className="text-xl font-bold text-white mb-1">{title}</div>
      <div className="text-white/60 text-sm uppercase tracking-wide">{subtitle}</div>
    </div>
  );
}

function HighlightsSection() {
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Highlights */}
          <div>
            <h2 className="text-4xl font-bold mb-8">Blueprint Highlights</h2>
            <div className="space-y-6">
              {[
                "AI-powered ROI modeling",
                "Heat reuse & sustainable integration", 
                "Legally structured SPV (Singapore/BVI)",
                "Aten Ventures deal flow"
              ].map((highlight, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-lg text-white/90">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden">
                <ProxyImage
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop"
                  alt="Luxury villa exterior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden">
                <ProxyImage
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop"
                  alt="Modern interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <ProxyImage
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop"
                  alt="Luxury bedroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestmentPathwaySection() {
  const steps = [
    { number: "1", title: "Buy Blueprint", desc: "Purchase your investment blueprint" },
    { number: "2", title: "Join Investor Club", desc: "Access exclusive deals and updates" },
    { number: "3", title: "Syndication Invite", desc: "Get invited to investment syndicates" },
    { number: "4", title: "Passive Returns", desc: "Earn returns on your investments" }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Investment Pathway</h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                {/* Connection Line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-white/20 z-0">
                    <ArrowRight className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>
                )}
                
                {/* Step Circle */}
                <div className="relative z-10 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceCardsSection() {
  const tiers = [
    {
      name: "Basic",
      price: "$199",
      features: ["10 Page Blueprint", "+ Community Access"],
      highlight: false
    },
    {
      name: "Standard", 
      price: "$997",
      features: ["Full ROI + Legal", "Structure Pack"],
      highlight: true
    },
    {
      name: "Premium",
      price: "$2,997", 
      features: ["+ 1-on-1 Strategy Call"],
      highlight: false
    }
  ];

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Blueprint</h2>
          <p className="text-white/70 text-lg">Blueprint availability limited. Deals close fast.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div key={i} className={`relative rounded-2xl p-8 text-center border-2 ${
              tier.highlight 
                ? 'border-yellow-500 bg-yellow-500/10' 
                : 'border-white/20 bg-white/5'
            }`}>
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
              <div className="text-4xl font-bold mb-6">{tier.price}</div>
              
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <div key={j} className="text-white/80">{feature}</div>
                ))}
              </div>
              
              <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
                tier.highlight
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyListingsSection({ listings, err }) {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {err && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-200">
            {String(err)}
          </div>
        )}

        {listings.length > 0 ? (
          <>
            <h2 className="text-4xl font-bold mb-12 text-center">Explore More Blueprints</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {listings.map((l, i) => (
                <PropertyCard key={`${l.projectTitle}-${i}`} listing={l} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">No Live Blueprints Right Now</h3>
            <p className="text-white/70 text-lg mb-8">
              Join our investor club to get first access when new eco-luxury deals drop.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition-colors">
              Join Investor Club
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ listing }) {
  const [idx, setIdx] = useState(0);
  
  const images = []
    .concat(
      listing?.galleryImages
        ? listing.galleryImages
            .split(",")
            .map((u) => u.trim())
            .filter(Boolean)
        : []
    )
    .concat(listing?.mainImage ? [listing.mainImage] : []);
    
  const shown = images.length ? images[idx % images.length] : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setIdx((p) => p + 1)}>
        <ProxyImage
          src={shown}
          alt={listing?.projectTitle}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-xs">
            {(idx % images.length) + 1}/{images.length}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{listing?.projectTitle}</h3>
          {listing?.status && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                listing.status === "Available"
                  ? "bg-green-500/20 text-green-400"
                  : listing.status === "Coming Soon"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {listing.status}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <MapPin className="w-5 h-5 mx-auto mb-1 text-white/60" />
            <div className="text-sm text-white/80">{listing?.location || "—"}</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-white/60" />
            <div className="text-sm text-white/80">{listing?.roiRange || "—"}</div>
            <div className="text-xs text-white/60">ROI</div>
          </div>
          <div className="text-center">
            <Home className="w-5 h-5 mx-auto mb-1 text-white/60" />
            <div className="text-sm text-white/80">{listing?.propertyType || "—"}</div>
          </div>
        </div>

        {listing?.description && (
          <p className="text-white/70 text-sm mb-6 line-clamp-3">{listing.description}</p>
        )}

        <div className="mb-6">
          <div className="text-sm text-white/60 mb-1">From</div>
          <div className="text-2xl font-bold">${listing?.startingInvestment}</div>
          <div className="text-sm text-white/60">Aten Ventures Exclusive</div>
        </div>

        <button className="block w-full text-center bg-yellow-600 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition-colors">
          BUY BLUEPRINT
        </button>
      </div>
    </div>
  );
}