// ListingsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { MapPin, TrendingUp, Home, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

/** ---------- GOOGLE DRIVE PROXY CONVERTER ---------- */
function convertToProxyUrl(url) {
  if (!url || !url.includes("drive.google.com")) return url;

  let fileId = null;
  const fileIdMatch1 = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  const fileIdMatch2 = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);

  if (fileIdMatch1) fileId = fileIdMatch1[1];
  else if (fileIdMatch2) fileId = fileIdMatch2[1];

  if (fileId) {
    const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    const proxyServices = [
      `https://cors-anywhere.herokuapp.com/${driveUrl}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(driveUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(driveUrl)}`,
      driveUrl,
    ];
    return { fileId, originalUrl: driveUrl, proxyUrls: proxyServices };
  }
  return url;
}

/** ---------- SMART PROXY IMAGE COMPONENT ---------- */
function ProxyImage({ src, alt, className, onLoad, onError }) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const urlInfo = useMemo(() => convertToProxyUrl(src), [src]);

  if (typeof urlInfo === "string") {
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
      setCurrentUrlIndex((prev) => prev + 1);
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

/** ---------- HEADER ---------- */
function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-20">
      <div className="text-2xl font-bold tracking-wide">
        <a href="/ecoluxury" className="hover:text-yellow-500 transition-colors">
          ATEN VENTURES
        </a>
      </div>
    </header>
  );
}

/** ---------- PROPERTY CARD ---------- */
function PropertyCard({ listing, index, listings }) {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

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

  const shown =
    images.length
      ? images[idx % images.length]
      : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop";

  const handleViewProperty = () => {
    const originalIndex = listings.findIndex(
      (l) =>
        l.projectTitle === listing.projectTitle &&
        l.location === listing.location &&
        l.startingInvestment === listing.startingInvestment
    );

    const slug =
      listing?.projectTitle
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-") || `property-${originalIndex}`;

    navigate(`/property/${slug}?id=${originalIndex}`);
  };

  return (
    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => setIdx((p) => p + 1)}
        title="Click to view next image"
      >
        <ProxyImage src={shown} alt={listing?.projectTitle} className="w-full h-full object-cover" />
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-xs">
            {(idx % images.length) + 1}/{images.length}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-xl font-bold hover:text-yellow-400 transition-colors cursor-pointer"
            onClick={handleViewProperty}
          >
            {listing?.projectTitle}
          </h3>
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
            <div className="text-sm text-white/80">
              {(listing?.roiRange && (listing.roiRange.match(/^[^%]*%/)?.[0] ?? listing.roiRange)) || "—"}
            </div>
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
          <div className="text-2xl font-bold">
            {typeof listing?.startingInvestment === "number"
              ? `$${listing.startingInvestment.toLocaleString()}`
              : `$${(listing?.startingInvestment ?? "").toString()}`}
          </div>
          <div className="text-sm text-white/60">Aten Ventures Exclusive</div>
        </div>

        <button
          onClick={handleViewProperty}
          className="block w-full text-center bg-[#9e8ffb] hover:bg-[#be84fb] text-black font-medium py-3 rounded-lg transition-colors"
        >
          VIEW BLUEPRINT
        </button>
      </div>
    </div>
  );
}

/** ---------- MAIN LISTINGS PAGE ---------- */
export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    status: "",
    minInvestment: "",
    maxInvestment: "",
    minROI: "",
    maxROI: "",
  });

  const [filtersOpen, setFiltersOpen] = useState(false); // collapsed on mobile by default

  // Fetch listings
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
        const listingsData = Array.isArray(data) ? data : [];
        setListings(listingsData);
        setFilteredListings(listingsData);
      } catch (e) {
        setErr(e?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = [...listings];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.projectTitle?.toLowerCase().includes(q) ||
          l.description?.toLowerCase().includes(q) ||
          l.location?.toLowerCase().includes(q) ||
          l.propertyType?.toLowerCase().includes(q)
      );
    }

    if (filters.location) {
      const q = filters.location.toLowerCase();
      filtered = filtered.filter((l) => l.location?.toLowerCase().includes(q));
    }

    if (filters.propertyType) {
      const q = filters.propertyType.toLowerCase();
      filtered = filtered.filter((l) => l.propertyType?.toLowerCase().includes(q));
    }

    if (filters.status) {
      filtered = filtered.filter((l) => l.status === filters.status);
    }

    if (filters.minInvestment) {
      filtered = filtered.filter((l) => (l.startingInvestment || 0) >= parseInt(filters.minInvestment));
    }

    if (filters.maxInvestment) {
      filtered = filtered.filter((l) => (l.startingInvestment || 0) <= parseInt(filters.maxInvestment));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.projectTitle || "").localeCompare(b.projectTitle || "");
        case "price-low":
          return (a.startingInvestment || 0) - (b.startingInvestment || 0);
        case "price-high":
          return (b.startingInvestment || 0) - (a.startingInvestment || 0);
        case "location":
          return (a.location || "").localeCompare(b.location || "");
        default:
          return 0;
      }
    });

    setFilteredListings(filtered);
  }, [listings, searchTerm, filters, sortBy]);

  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      status: "",
      minInvestment: "",
      maxInvestment: "",
      minROI: "",
      maxROI: "",
    });
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/80 text-xl">Loading listings…</div>
      </div>
    );
  }

  return (
    // Root: flex column so footer can sit at the bottom
    <div className="min-h-screen bg-[#0a1021] text-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main grows to fill, pushing footer down */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">All Eco-Luxury Blueprints</h1>
            <p className="text-white/70">
              Discover investment opportunities in sustainable luxury properties
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-80 space-y-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Filters</h3>

                  <div className="flex items-center gap-3">
                    {/* Clear button (desktop) */}
                    <button
                      onClick={clearFilters}
                      className="hidden md:inline-block text-[#9e8ffb] hover:text-[#be84fb] text-sm"
                    >
                      Clear
                    </button>

                    {/* Mobile-only toggle */}
                    <button
                      type="button"
                      className="md:hidden inline-flex items-center gap-1 text-xs text-white/80 bg-white/10 hover:bg-white/15 border border-white/20 rounded-md px-2.5 py-1.5"
                      onClick={() => setFiltersOpen((p) => !p)}
                      aria-expanded={filtersOpen}
                      aria-controls="filters-body"
                    >
                      {filtersOpen ? "Hide" : "Show"}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Body: hidden on mobile when collapsed, always shown on md+ */}
                <div id="filters-body" className={`${filtersOpen ? "block" : "hidden"} md:block space-y-4`}>
                  {/* Mobile Clear */}
                  <div className="md:hidden flex justify-end -mt-2 mb-2">
                    <button onClick={clearFilters} className="text-yellow-500 hover:text-yellow-400 text-sm">
                      Clear Filter
                    </button>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Phuket, Bali..."
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                    />
                  </div>

                  {/* Property Type Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Type</label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="">All Types</option>
                      <option value="Villa">Villa</option>
                      <option value="Resort">Resort</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Hotel">Hotel</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="">All Status</option>
                      <option value="Available">Available</option>
                      <option value="Coming Soon">Coming Soon</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>

                  {/* Investment Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Investment Range ($)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minInvestment}
                        onChange={(e) => handleFilterChange("minInvestment", e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxInvestment}
                        onChange={(e) => handleFilterChange("maxInvestment", e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Count (desktop only) */}
              <div className="hidden md:block text-white/70 text-sm">
                Showing {filteredListings.length} of {listings.length} properties
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Sort Bar */}
              <div className="bg-white/5 rounded-2xl p-4 mb-8 border border-white/10">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search properties, locations, descriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
                    />
                  </div>
                  {/* Sort */}
                  <div className="md:w-48">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="location">Sort by Location</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Error */}
              {err && (
                <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-200">
                  {String(err)}
                </div>
              )}

              {/* Listings Grid */}
              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredListings.map((listing, i) => (
                    <PropertyCard
                      key={`${listing.projectTitle}-${i}`}
                      listing={listing}
                      index={i}
                      listings={listings}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold mb-4">No Properties Found</h3>
                  <p className="text-white/70 mb-6">
                    Try adjusting your search criteria or filters to find more properties.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer pinned to bottom */}
      <footer className="mt-auto w-full border-t border-cyan-400/40">
        <div className="mx-auto max-w-screen-2xl px-4 py-6 pb-[env(safe-area-inset-bottom)]">
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
              className="inline-flex items-center gap-2 underline text-white px-4 py-2 text-sm transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
