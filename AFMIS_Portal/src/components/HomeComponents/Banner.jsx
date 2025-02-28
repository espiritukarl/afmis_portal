import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

//Simple Carousel to be showin
export default function Banner() {
  const [index, setIndex] = useState(0);
  const length = bannerImages.length;

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [index, length]);

  return (
    <div className="banner-container">
      <Icon
        icon={"icon-park-outline:left"}
        width={30}
        onClick={handlePrevious}
        className="previous-banner"
      />
      <img src={bannerImages[index]} alt="" className="banner-image" />
      <Icon
        icon={"icon-park-outline:right"}
        width={30}
        onClick={handleNext}
        className="next-banner"
      />
      <div className="dots">
        {bannerImages.map((_, currentIndex) => (
          <div
            key={currentIndex + "ofbanner"}
            className={currentIndex === index ? "dot selected" : "dot"}
            onClick={() => setIndex(currentIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
}

//useEffect data of bannerImages it's just an array of strings
const bannerImages = [
  "banner0.jpg",
  "banner1.jpg",
  "banner2.jpg",
  "banner4.jpg",
];
