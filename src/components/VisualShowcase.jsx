import { useState } from "react";
export default function VisualShowcase({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = []
    .concat(
      property?.galleryImages
        ? property.galleryImages.split(",").map(u => u.trim()).filter(Boolean)
        : []
    )
    .concat(property?.coverImage ? [property.coverImage] : [])
    .concat(property?.mainImage ? [property.mainImage] : []);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  if (!images.length) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Visual Showcase</h2>
          <p className="text-white/70 text-lg">
            Experience the luxury and sustainability of this exclusive property
          </p>
        </div>

        {/* Main Image Display */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={`${property?.projectTitle} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageChange(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => handleImageChange(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
                >
                  →
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Image Thumbnails */}
        {images.length > 1 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex 
                      ? 'border-yellow-500' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
