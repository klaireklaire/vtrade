import React, { useState } from "react";

export default function ImageUpload() {
  const [images, setImages] = React.useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
    setSelectedImageIndex(images.length); // Select the last uploaded image
  };

  return (
    <div className="flex flex-col">
      <div
        className="ml-[77px] mr-[55px] h-[440px] w-[640px] mx-auto rounded-2xl bg-white border-dashed border-2 border-gray-300 overflow-hidden flex flex-col items-center justify-center"
        onDragOver={handleFileInputChange}
        onDragLeave={handleFileInputChange}
        onDrop={handleFileInputChange}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input
          type="file"
          id="file-input"
          hidden
          onChange={handleFileInputChange}
          accept="image/*"
          multiple
        />
        {images.length === 0 ? (
          <p className="text-light-black font-mulish text-lg text-center font-semibold tracking-[0.1px]">
            Click or Drag Photos Here
          </p>
        ) : (
          <img
            src={URL.createObjectURL(images[selectedImageIndex])}
            alt={`Image ${selectedImageIndex}`}
            className="max-h-full max-w-full mx-auto"
          />
        )}
      </div>
    </div>
  );
}
