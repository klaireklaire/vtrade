import React from "react";
import { useState, useEffect, useRef } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import "./homepage.css";

export default function Carousel({}) {
  const slides = [
    require("../../Assets/home1.png"),
    require("../../Assets/home2.png"),
    require("../../Assets/home3.png"),
    require("../../Assets/home4.png"),
  ];
  const [imageIndex, setImageIndex] = useState(0);
  const autoSlideInterval = 7000;
  const autoSlideTimerRef = useRef(null);

  const handleButtonClick = (index) => {
    resetAutoSlideTimer();
    setImageIndex(index);
  };

  const handleSlideClick = (direction) => {
    resetAutoSlideTimer();
    direction === "prev" ? showPreviousImage() : showNextImage();
  };

  const showPreviousImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startAutoSlide = () => {
    autoSlideTimerRef.current = setInterval(() => {
      showNextImage();
    }, autoSlideInterval);
  };

  const resetAutoSlideTimer = () => {
    clearInterval(autoSlideTimerRef.current);
    startAutoSlide();
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideTimerRef.current);
  };

  useEffect(() => {
    // Start auto-slide when the component mounts
    startAutoSlide();

    // Stop auto-slide when the component unmounts
    return () => {
      stopAutoSlide();
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return (
    <div className="relative">
      <div className="w-full h-full overflow-hidden flex">
        {slides.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              transform: `translateX(-${100 * imageIndex}%)`,
            }}
            className="object-cover block w-full h-full flex-shrink-0 flex-grow-0 transition-transform duration-300 ease-in-out"
          />
        ))}
      </div>
      <button
        onClick={() => handleSlideClick("prev")}
        className="group block absolute left-0 top-0 bottom-0 h-full p-4 cursor-pointer stroke-white fill-black transition duration-200 ease-in-out hover:bg-black  hover:bg-opacity-20"
      >
        <ArrowBigLeft className="w-8 h-8 group-hover:animate-squish" />
      </button>
      <button
        onClick={() => handleSlideClick("next")}
        className="group block absolute right-0 top-0 bottom-0 h-full p-4 cursor-pointer stroke-white fill-black transition duration-200 ease-in-out hover:bg-black hover:bg-opacity-20"
      >
        <ArrowBigRight className="w-8 h-8 group-hover:animate-squish" />
      </button>
      <div className="absolute bottom-3 left-2/4 -translate-x-2/4 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`rounded-full w-4 h-4 hover:animate-squish ${
              index === imageIndex ? `bg-gray-400` : " bg-black"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
