// import { useMemo, useState, useEffect } from "react";
// import ProxyImage from "../components/ProxyImage";

// /** Extract a Google Drive file ID from any common URL shape. */
// function getDriveId(url = "") {
//   if (!url || !url.includes("drive.google.com")) return "";
//   const m1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);        // /file/d/<ID>/
//   if (m1?.[1]) return m1[1];
//   const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);            // ?id=<ID>
//   if (m2?.[1]) return m2[1];
//   const m3 = url.match(/[?&]ids=([a-zA-Z0-9_-]+)/);           // rare multi-ids
//   if (m3?.[1]) return m3[1];
//   return "";
// }

// /** Normalize to Drive direct-view (uc?export=view) or pass-through non-Drive. */
// function normalizeDriveUrl(url = "") {
//   if (!url) return "";
//   if (!url.includes("drive.google.com")) return url.trim();
//   // drop folders here — caller will swap with fallback so count is preserved
//   if (url.includes("/drive/folders/")) return ""; 

//   const id = getDriveId(url);
//   return id ? `https://drive.google.com/uc?export=view&id=${id}` : url.trim();
// }

// /** Split by comma | pipe | newline (Windows/Mac) -> trim -> drop empties */
// function splitList(val) {
//   if (!val) return [];
//   return val
//     .split(/[,|\n\r]+/g)
//     .map((s) => s.trim())
//     .filter(Boolean);
// }

// export default function VisualShowcase({ property }) {
//   const [current, setCurrent] = useState(0);

//   const images = useMemo(() => {
//     const rawGallery = splitList(property?.galleryImages);

//     // Prepare fallbacks for any folder entries we encounter
//     const coverNorm = normalizeDriveUrl(property?.coverImage);
//     const mainNorm  = normalizeDriveUrl(property?.mainImage);
//     const generic   = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";
//     const pickFallback = () => coverNorm || mainNorm || generic;

//     // 1) Normalize each gallery entry.
//     //    If it's a Drive folder (normalize returns ""), substitute a fallback
//     //    so the count (e.g., 14) is preserved.
//     const galleryNorm = rawGallery.map((u) => {
//       const norm = normalizeDriveUrl(u);
//       return norm || pickFallback();
//     });

//     // 2) Add cover + main only if they’re not already present in the gallery
//     //    (compare by normalized URL to avoid the "last image twice" issue).
//     const out = [...galleryNorm];

//     if (coverNorm && !out.includes(coverNorm)) out.push(coverNorm);
//     if (mainNorm  && !out.includes(mainNorm))  out.push(mainNorm);

//     return out;
//   }, [property]);

//   // Safety: reset index if list changes and current is out of range
//   useEffect(() => {
//     if (current >= images.length) setCurrent(0);
//   }, [images, current]);

//   if (!images.length) return null;

//   const total = images.length;
//   const showArrows = total > 1;
//   const showThumbs = total > 1;

//   const thumbsMode = total <= 3 ? "tight" : total <= 7 ? "grid" : "scroll";

//   const next = () => setCurrent((i) => (i + 1) % total);
//   const prev = () => setCurrent((i) => (i - 1 + total) % total);
//   const go   = (idx) => setCurrent(idx);

//   return (
//     <section className="py-20 bg-transparent">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Visual Showcase</h2>
//           <p className="text-white/70 text-lg">
//             Experience the luxury and sustainability of this exclusive property
//           </p>
//         </div>

//         {/* Main Image */}
//         <div className="max-w-6xl mx-auto mb-8">
//           <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden">
//             <ProxyImage
//               src={images[current]}
//               alt={`${property?.projectTitle || "Property"} - Image ${current + 1}`}
//               className="w-full h-full object-cover"
//             />
//             {showArrows && (
//               <>
//                 <button
//                   onClick={prev}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
//                   aria-label="Previous image"
//                 >
//                   ←
//                 </button>
//                 <button
//                   onClick={next}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
//                   aria-label="Next image"
//                 >
//                   →
//                 </button>
//                 <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm">
//                   {current + 1} / {total}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Thumbnails */}
//         {showThumbs && (
//           <div className="max-w-6xl mx-auto">
//             {thumbsMode === "scroll" ? (
//               <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 pr-1">
//                 {images.map((img, i) => (
//                   <button
//                     key={`${i}-${img}`}
//                     onClick={() => go(i)}
//                     className={`relative min-w-24 w-24 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
//                       i === current ? "border-yellow-500" : "border-white/20 hover:border-white/40"
//                     }`}
//                     aria-label={`Thumbnail ${i + 1}`}
//                   >
//                     <ProxyImage src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             ) : thumbsMode === "grid" ? (
//               <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
//                 {images.map((img, i) => (
//                   <button
//                     key={`${i}-${img}`}
//                     onClick={() => go(i)}
//                     className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
//                       i === current ? "border-yellow-500" : "border-white/20 hover:border-white/40"
//                     }`}
//                     aria-label={`Thumbnail ${i + 1}`}
//                   >
//                     <ProxyImage src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex gap-2 justify-center">
//                 {images.map((img, i) => (
//                   <button
//                     key={`${i}-${img}`}
//                     onClick={() => go(i)}
//                     className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
//                       i === current ? "border-yellow-500" : "border-white/20 hover:border-white/40"
//                     }`}
//                     aria-label={`Thumbnail ${i + 1}`}
//                   >
//                     <ProxyImage src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import { useMemo, useState, useEffect } from "react";
import ProxyImage from "../components/ProxyImage";

/** Extract a Google Drive file ID */
function getDriveId(url = "") {
  if (!url || !url.includes("drive.google.com")) return "";
  const m1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);       // /file/d/<ID>/
  if (m1?.[1]) return m1[1];
  const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);           // ?id=<ID>
  if (m2?.[1]) return m2[1];
  return "";
}

/** Normalize to a direct-view URL (Drive → uc?export=view&id=) */
function normalizeDriveUrl(url = "") {
  if (!url) return "";
  if (url.includes("/drive/folders/")) return ""; // can't render folders
  if (!url.includes("drive.google.com")) return url.trim();

  const id = getDriveId(url);
  return id ? `https://drive.google.com/uc?export=view&id=${id}` : url.trim();
}

/** Equality by Drive ID (if any), else by normalized URL */
function equalByIdOrUrl(a = "", b = "") {
  const aid = getDriveId(a);
  const bid = getDriveId(b);
  if (aid && bid) return aid === bid;
  return a.trim() === b.trim();
}
function includesByIdOrUrl(arr, candidate) {
  return arr.some((x) => equalByIdOrUrl(x, candidate));
}

/** Split by comma | pipe | newline → trim → drop empties */
function splitList(val) {
  if (!val) return [];
  return val
    .split(/[,|\n\r]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function VisualShowcase({ property }) {
  const [current, setCurrent] = useState(0);

  const images = useMemo(() => {
    const generic =
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop";

    const coverNorm = normalizeDriveUrl(property?.coverImage);
    const mainNorm  = normalizeDriveUrl(property?.mainImage);

    // Build gallery, normalizing each, replacing folders with a non-cover fallback
    const pickFallbackForFolder = () => mainNorm || generic;

    const galleryNorm = splitList(property?.galleryImages).map((u) => {
      const norm = normalizeDriveUrl(u);
      return norm || pickFallbackForFolder(); // keep count but avoid cover fallback
    });

    // Remove any entries equal to the cover
    const galleryNoCover = galleryNorm.filter((u) => !equalByIdOrUrl(u, coverNorm));

    // Final list: start with gallery (no cover), then add main if not present
    const out = [...galleryNoCover];
    if (mainNorm && !includesByIdOrUrl(out, mainNorm)) out.push(mainNorm);

    // If nothing left, use main → cover → generic
    if (!out.length) {
      if (mainNorm) out.push(mainNorm);
      else if (coverNorm) out.push(coverNorm);
      else out.push(generic);
    }

    return out;
  }, [property]);

  useEffect(() => {
    if (current >= images.length) setCurrent(0);
  }, [images, current]);

  if (!images.length) return null;

  const total = images.length;
  const showArrows = total > 1;
  const showThumbs = total > 1;
  const thumbsMode = total <= 3 ? "tight" : total <= 7 ? "grid" : "scroll";

  const next = () => setCurrent((i) => (i + 1) % total);
  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const go   = (idx) => setCurrent(idx);

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Visual Showcase</h2>
          <p className="text-white/70 text-lg">
            Experience the luxury and sustainability of this exclusive property
          </p>
        </div>

        {/* Main Image */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden">
            <ProxyImage
              src={images[current]}
              alt={`${property?.projectTitle || "Property"} - Image ${current + 1}`}
              className="w-full h-full object-cover"
            />
            {showArrows && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  →
                </button>
                <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm">
                  {current + 1} / {total}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {showThumbs && (
          <div className="max-w-6xl mx-auto">
            {thumbsMode === "scroll" ? (
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 pr-1">
                {images.map((img, i) => (
                  <button
                    key={`${i}-${img}`}
                    onClick={() => go(i)}
                    className={`relative min-w-24 w-24 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      i === current ? "border-yellow-500" : "border-white/20 hover:border-white/40"
                    }`}
                    aria-label={`Thumbnail ${i + 1}`}
                  >
                    <ProxyImage src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            ) : thumbsMode === "grid" ? (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {images.map((img, i) => (
                  <button
                    key={`${i}-${img}`}
                    onClick={() => go(i)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      i === current ? "border-yellow-500" : "border-white/20 hover:border-white/40"
                    }`}
                    aria-label={`Thumbnail ${i + 1}`}
                  >
                    <ProxyImage src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 justify-center">
                {images.map((img, i) => (
                  <button
                    key={`${i}-${img}`}
                    onClick={() => go(i)}
                    className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      i === current ? "border-yellow-500" : "border-white/20 hover:border-white/40"
                    }`}
                    aria-label={`Thumbnail ${i + 1}`}
                  >
                    <ProxyImage src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
