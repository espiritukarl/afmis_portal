import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const length = bannerImages.length;

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIndex((prevIndex) => (prevIndex - 1 + length) % length);
    }, 300);
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setIndex((prevIndex) => (prevIndex + 1) % length);
      }, 300);
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
      <img
        src={bannerImages[index]}
        alt=""
        className={isAnimating ? "banner-image transition" : "banner-image"}
      />
      <img
        src={bannerImages[(index + 1 + length) % length]}
        alt=""
        className={isAnimating ? "fade-in" : "fade-out"}
      />
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

const bannerImages = ["news1.jpg", "news2.png", "event6.jpg"];
