import React, { useEffect, useMemo, useState } from "react";
import { MapPin, TrendingUp, Home, Check, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

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

function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-20">
      <div className="text-2xl font-bold tracking-wide">
        <a href="/ecoluxury" className="hover:text-yellow-500 transition-colors">ATEN VENTURES</a>
      </div>
 
    </header>
  );
}

// Then update your PropertyCard function:
function PropertyCard({ listing, index, listings }) {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate(); // React Router navigation hook
  
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

  // Handle navigation to property detail page - CORRECTED VERSION
  const handleViewProperty = () => {
  // Find the original index in the full listings array
  const originalIndex = listings.findIndex(l => 
    l.projectTitle === listing.projectTitle && 
    l.location === listing.location &&
    l.startingInvestment === listing.startingInvestment
  );
  
  const slug = listing?.projectTitle?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')           
    .replace(/^-+|-+$/g, '')              
    .replace(/-{2,}/g, '-')               
    || `property-${originalIndex}`;                

  // Use the original index from the full listings array
  navigate(`/property/${slug}?id=${originalIndex}`);
};


  return (
    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setIdx((p) => p + 1)}>
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
          <div className="text-2xl font-bold">${listing?.startingInvestment?.toLocaleString()}</div>
          <div className="text-sm text-white/60">Aten Ventures Exclusive</div>
        </div>

        <button 
          onClick={handleViewProperty}
          className="block w-full text-center bg-yellow-600 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition-colors"
        >
          VIEW BLUEPRINT
        </button>
      </div>
    </div>
  );
}
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
    
//   const shown = images.length ? images[idx % images.length] : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop";


//   const handleViewProperty = () => {
//     // Assuming you have a unique ID or can use the index
//     const propertyId = listing?.id || index;
//     const slug = listing?.projectTitle?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `property-${propertyId}`;
    
//     // Navigate to property detail page
//     window.location.href = `/property/${slug}?id=${propertyId}`;
//     // OR if using Next.js router:
//     // router.push(`/property/${slug}?id=${propertyId}`);
//   };

//   return (
//     <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
//       <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setIdx((p) => p + 1)}>
//         <ProxyImage
//           src={shown}
//           alt={listing?.projectTitle}
//           className="w-full h-full object-cover"
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
//           <div className="text-center">
//             <MapPin className="w-5 h-5 mx-auto mb-1 text-white/60" />
//             <div className="text-sm text-white/80">{listing?.location || "—"}</div>
//           </div>
//           <div className="text-center">
//             <TrendingUp className="w-5 h-5 mx-auto mb-1 text-white/60" />
//             <div className="text-sm text-white/80">{listing?.roiRange || "—"}</div>
//             <div className="text-xs text-white/60">ROI</div>
//           </div>
//           <div className="text-center">
//             <Home className="w-5 h-5 mx-auto mb-1 text-white/60" />
//             <div className="text-sm text-white/80">{listing?.propertyType || "—"}</div>
//           </div>
//         </div>

//         {listing?.description && (
//           <p className="text-white/70 text-sm mb-6 line-clamp-3">{listing.description}</p>
//         )}

//         <div className="mb-6">
//           <div className="text-sm text-white/60 mb-1">From</div>
//           <div className="text-2xl font-bold">${listing?.startingInvestment}</div>
//           <div className="text-sm text-white/60">Aten Ventures Exclusive</div>
//         </div>

//         <button onClick={handleViewProperty} className="block w-full text-center bg-yellow-600 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition-colors">
//           VIEW BLUEPRINT
//         </button>
//       </div>
//     </div>
//   );
// }

// ===== MAIN LISTINGS PAGE COMPONENT =====
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
    maxROI: ""
  });

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

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...listings];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(listing => 
        listing.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.propertyType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(listing => 
        listing.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(listing => 
        listing.propertyType?.toLowerCase().includes(filters.propertyType.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(listing => listing.status === filters.status);
    }

    if (filters.minInvestment) {
      filtered = filtered.filter(listing => 
        listing.startingInvestment >= parseInt(filters.minInvestment)
      );
    }

    if (filters.maxInvestment) {
      filtered = filtered.filter(listing => 
        listing.startingInvestment <= parseInt(filters.maxInvestment)
      );
    }

    // Apply sorting
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      status: "",
      minInvestment: "",
      maxInvestment: "",
      minROI: "",
      maxROI: ""
    });
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/80 text-xl">Loading listings…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Eco-Luxury Blueprints</h1>
          <p className="text-white/70">Discover investment opportunities in sustainable luxury properties</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-yellow-500 hover:text-yellow-400 text-sm"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
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

            {/* Results Count */}
            <div className="text-white/70 text-sm">
              Showing {filteredListings.length} of {listings.length} properties
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white/5 rounded-2xl p-4 mb-8 border border-white/10">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search properties, locations, descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
                  />
                </div>

                {/* Sort Dropdown */}
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

            {/* Error Display */}
            {err && (
              <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-200">
                {String(err)}
              </div>
            )}

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing, i) => (
                  <PropertyCard key={`${listing.projectTitle}-${i}`} listing={listing} index={i} listings={listings}  />
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
    </div>
  );
}