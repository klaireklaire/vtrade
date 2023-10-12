import React from "react";

export default function ImageScroll({
  images,
  updateParentRemovedImage,
  updateParentSelectedImageIndex,
}) {
  const handleRemoveImage = (index) => {
    updateParentRemovedImage(index);
  };

  return (
    <div>
      {images.length > 0 && (
        <div
          className="overflow-x-auto whitespace-nowrap ml-[77px]"
          style={{ maxWidth: "640px" }}
        >
          <div className="flex flex-nowrap justify-start mt-3 ">
            {images.map((file, index) => (
              <div key={index} className="relative m-2">
                <button
                  className="flex items-center justify-center absolute -top-2 -right-2 w-6 h-6 p-1 bg-black rounded-full text-white text-xs cursor-pointer hover:bg-gray-700"
                  onClick={() => handleRemoveImage(index)}
                >
                  x
                </button>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  onClick={() => updateParentSelectedImageIndex(index)}
                  className="max-h-[100px] max-w-[100px] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
