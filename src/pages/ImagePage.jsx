import React, { useEffect, useMemo, useState, useRef } from "react";
import { X, Upload } from "lucide-react";

const ACCEPT = "image/png,image/jpeg,image/jpg";
const MAX_GALLERY = 20;

export default function ImagePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");

  const [singleFile, setSingleFile] = useState(null);          // { file, url }
  const [galleryFiles, setGalleryFiles] = useState([]);        // [{ file, url }...]

  const [isDraggingSingle, setIsDraggingSingle] = useState(false);
  const [isDraggingMulti, setIsDraggingMulti] = useState(false);

  const singleInputRef = useRef(null);
  const multiInputRef = useRef(null);

  // --------- Fetch listings for the dropdown ---------
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

  const options = useMemo(() => {
    return listings.map((l, i) => ({
      label: l?.projectTitle || `Property #${i + 1}`,
      value: String(i),
    }));
  }, [listings]);

  // ---------- Helpers ----------
  const revokeURL = (objUrl) => {
    try { URL.revokeObjectURL(objUrl); } catch {}
  };

  const isValidImage = (file) =>
    file && (file.type === "image/png" || file.type === "image/jpeg" || file.name?.match(/\.(png|jpe?g)$/i));

  // ---------- Single uploader ----------
  const handleSingleFiles = (files) => {
    if (!files?.length) return;
    const f = files[0];
    if (!isValidImage(f)) {
      alert("Only PNG/JPG/JPEG allowed.");
      return;
    }
    // replace previous
    if (singleFile?.url) revokeURL(singleFile.url);
    setSingleFile({ file: f, url: URL.createObjectURL(f) });
  };

  const onSingleInput = (e) => handleSingleFiles(e.target.files);
  const onSingleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIsDraggingSingle(false);
    handleSingleFiles(e.dataTransfer.files);
  };

  const clearSingle = () => {
    if (singleFile?.url) revokeURL(singleFile.url);
    setSingleFile(null);
    if (singleInputRef.current) singleInputRef.current.value = "";
  };

  // ---------- Multi uploader ----------
  const handleMultiFiles = (files) => {
    if (!files?.length) return;

    const valid = Array.from(files).filter(isValidImage);
    if (valid.length !== files.length) {
      alert("Some files were skipped because they are not PNG/JPG/JPEG.");
    }

    const remaining = MAX_GALLERY - galleryFiles.length;
    const toAdd = valid.slice(0, remaining);
    const skipped = valid.length - toAdd.length;

    const newObjs = toAdd.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setGalleryFiles((prev) => [...prev, ...newObjs]);

    if (skipped > 0) {
      alert(`Gallery limit is ${MAX_GALLERY}. Skipped ${skipped} file(s).`);
    }
  };

  const onMultiInput = (e) => handleMultiFiles(e.target.files);
  const onMultiDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIsDraggingMulti(false);
    handleMultiFiles(e.dataTransfer.files);
  };

  const removeFromGallery = (idx) => {
    setGalleryFiles((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      if (removed?.url) revokeURL(removed.url);
      return copy;
    });
  };

  const clearGallery = () => {
    galleryFiles.forEach((g) => g?.url && revokeURL(g.url));
    setGalleryFiles([]);
    if (multiInputRef.current) multiInputRef.current.value = "";
  };

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (singleFile?.url) revokeURL(singleFile.url);
      galleryFiles.forEach((g) => g?.url && revokeURL(g.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pickedListing = selectedIndex !== "" ? listings[Number(selectedIndex)] : null;

    // You can build a FormData here to POST to your backend.
    // For now, just log.
    console.log("Selected listing index:", selectedIndex);
    console.log("Selected listing:", pickedListing);
    console.log("Single file:", singleFile?.file);
    console.log("Gallery files:", galleryFiles.map((g) => g.file));

    alert("Form ready. Hook this up to your backend as needed.");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white ">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Image Uploader</h1>
        <p className="text-white/70 mb-8">Pick a property, then add images (single + gallery).</p>

        {/* API status */}
        {loading && (
          <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-3">Loading listings…</div>
        )}
        {err && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-200">
            {String(err)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1) Listing selector */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold mb-4">1) Choose a property</h2>
            <select
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white disabled:opacity-50"
              disabled={loading || !!err || options.length === 0}
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(e.target.value)}
            >
              <option value="" disabled>
                {loading ? "Loading…" : options.length ? "Select a property…" : "No listings found"}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </section>

          {/* 2) Single image uploader */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">2) Upload cover image (1 file)</h2>
              {singleFile && (
                <button
                  type="button"
                  onClick={clearSingle}
                  className="text-sm text-yellow-400 hover:text-yellow-300"
                >
                  Clear
                </button>
              )}
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingSingle(true); }}
              onDragLeave={() => setIsDraggingSingle(false)}
              onDrop={onSingleDrop}
              className={`relative rounded-xl border-2 border-dashed p-6 transition 
                ${isDraggingSingle ? "border-yellow-400 bg-white/10" : "border-white/20 bg-white/5"}`}
            >
              {!singleFile ? (
                <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                  <Upload className="w-8 h-8 opacity-75" />
                  <div className="text-white/80">Drag & drop a PNG/JPG here, or</div>
                  <button
                    type="button"
                    onClick={() => singleInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20"
                  >
                    Choose file
                  </button>
                  <input
                    ref={singleInputRef}
                    type="file"
                    accept={ACCEPT}
                    onChange={onSingleInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={singleFile.url}
                    alt="Cover preview"
                    className="w-full max-h-[360px] object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={clearSingle}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1"
                    aria-label="Remove"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 3) Gallery uploader (up to 20) */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">3) Upload gallery (up to {MAX_GALLERY})</h2>
              {galleryFiles.length > 0 && (
                <button
                  type="button"
                  onClick={clearGallery}
                  className="text-sm text-yellow-400 hover:text-yellow-300"
                >
                  Clear all
                </button>
              )}
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingMulti(true); }}
              onDragLeave={() => setIsDraggingMulti(false)}
              onDrop={onMultiDrop}
              className={`relative rounded-xl border-2 border-dashed p-6 transition 
                ${isDraggingMulti ? "border-yellow-400 bg-white/10" : "border-white/20 bg-white/5"}`}
            >
              <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                <Upload className="w-7 h-7 opacity-75" />
                <div className="text-white/80">
                  Drag & drop up to {MAX_GALLERY} PNG/JPG images here, or
                </div>
                <button
                  type="button"
                  onClick={() => multiInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20"
                >
                  Choose files
                </button>
                <input
                  ref={multiInputRef}
                  type="file"
                  multiple
                  accept={ACCEPT}
                  onChange={onMultiInput}
                  className="hidden"
                />
              </div>

              {/* Thumbs */}
              {galleryFiles.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {galleryFiles.map((g, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={g.url}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-36 object-cover rounded-lg border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromGallery(idx)}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1 opacity-100 group-hover:opacity-100"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Submit (hook this to backend if needed) */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => { clearSingle(); clearGallery(); setSelectedIndex(""); }}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#9e8ffb] hover:bg-[#be84fb] text-black font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
