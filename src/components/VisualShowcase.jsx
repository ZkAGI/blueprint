import { useMemo, useState } from "react";
import ProxyImage from "../components/ProxyImage";

/** Normalize Google Drive URLs to direct-view */
function normalizeDriveUrl(url) {
  if (!url) return url;
  if (url.includes("/drive/folders/")) return ""; // folder links can't render as images
  if (!url.includes("drive.google.com")) return url;

  const m1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = m1?.[1] || m2?.[1];
  return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
}

/** Split by common separators (comma, newline, pipe), trim, drop empty */
function splitList(val) {
  if (!val) return [];
  return val
    .split(/[,|\n]/g)
    .map(s => s.trim())
    .filter(Boolean);
}

/** Unique, keep first occurrence */
/** Unique, keep first occurrence */
function unique(arr) {
  const seen = new Set();
  return arr.filter(x => {
    if (seen.has(x)) return false;
    seen.add(x);
    return true;
  });
}


export default function VisualShowcase({ property }) {
  const [current, setCurrent] = useState(0);

  const images = useMemo(() => {
    const gallery = splitList(property?.galleryImages);
    const merged = [
      ...gallery,
      ...(property?.coverImage ? [property.coverImage] : []),
      ...(property?.mainImage ? [property.mainImage] : []),
    ]
      .map(normalizeDriveUrl)
      .filter(Boolean);

    return unique(merged);
  }, [property]);

  if (!images.length) return null;

  const total = images.length;
  const showArrows = total > 1;
  const showThumbs = total > 1;

  // Decide thumbs style based on count
  const thumbsMode =
    total <= 3 ? "tight"
    : total <= 7 ? "grid"
    : "scroll"; // 8+ → horizontal scroll

  const next = () => setCurrent((i) => (i + 1) % total);
  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const go = (idx) => setCurrent(idx);

  return (
    <section className="py-20 bg-gray-900">
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
              // 8+ images → horizontal scroll row
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 pr-1">
                {images.map((img, i) => (
                  <button
                    key={i}
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
              // 4–7 images → grid
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
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
              // 2–3 images → tight row
              <div className="flex gap-2 justify-center">
                {images.map((img, i) => (
                  <button
                    key={i}
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
