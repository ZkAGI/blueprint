import React, { useMemo, useState } from "react";

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

export default function ProxyImage({ src, alt, className }) {
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
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    );
  }

  const currentUrl = urlInfo.proxyUrls[currentUrlIndex] || urlInfo.originalUrl;

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    if (currentUrlIndex < urlInfo.proxyUrls.length - 1) {
      setCurrentUrlIndex((prev) => prev + 1);
    } else {
      setIsLoading(false);
      setHasError(true);
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
          <div className="text-white/60 text-sm">Loading...</div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
          <div className="text-white/80 text-sm">⚠️ Image Failed</div>
        </div>
      )}
    </div>
  );
}
