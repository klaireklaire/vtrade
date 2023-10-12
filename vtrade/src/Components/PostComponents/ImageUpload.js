import React from "react";

export default function ImageUpload({
  updateParentFile,
  images,
  selectedImageIndex,
}) {
  const handleFileInputChange = (event) => {
    // Check if the current number of images is less than 7 before allowing upload
    if (images.length < 7) {
      updateParentFile(event);
    } else {
      // Optionally, you can display a message or disable the upload button.
      // For this example, we'll simply alert the user.
      alert("You can only upload a maximum of 7 photos.");
    }
  };

  return (
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
        <p className="text-light-black font-mulish text-lg text-center font-semibold tracking-wide">
          Click or Drag Photos Here
        </p>
      ) : (
        <img
          class="lazy"
          src={URL.createObjectURL(images[selectedImageIndex])}
          alt={`Image ${selectedImageIndex}`}
          className="max-h-full max-w-full mx-auto"
        />
      )}
    </div>
  );
}
