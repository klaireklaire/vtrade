import React, { useState, useEffect } from "react";

export default function ImageSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Reset the current image index when the images change
    setCurrentImageIndex(0);
  }, [images]);

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className="mb-8 flex flex-row">
        <div className="max-w rounded overflow-hidden shadow-lg">
          {images && images.length > 0 ? (
            <div>
              <img
                className="h-48 w-full object-cover absolute transition-transform"
                src={images[currentImageIndex]}
                alt={`Listing photo ${currentImageIndex + 1}`}
              />
              <button
                onClick={handlePrevClick}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded"
              >
                &lt;
              </button>
              <button
                onClick={handleNextClick}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded"
              >
                &gt;
              </button>
            </div>
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
    </div>
  );
}
