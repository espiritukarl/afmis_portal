//React, Libraries, Styling
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./Infographics.css";

//Components
import SectionTitle from "../../components/SectionTitle";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";

//Data
import { priceReports } from "../../data/PriceReports";

export default function Infographics() {
  const [activeImage, setActiveImage] = useState(InfographicImgs[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <SectionTitle title={"Daily Infographics"} />
      <article className="daily-infographics-container">
        <img
          src="/infographics.jpg"
          alt="Daily Infographics image"
          className="daily-infographics"
          onClick={() => setIsModalOpen(true)}
        />
      </article>
      <article className="image-preview-container">
        <img src={activeImage} alt="selected image from carousel" />
      </article>
      <section className="infographics-carousel">
        <Carousel activeImage={activeImage} setActiveImage={setActiveImage} />
      </section>
      <Table rawData={priceReports} title={"Other Infographics"} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={
          <img
            src="/infographics.jpg"
            alt="Daily Infographics image modal"
            className="modal-content-img"
          />
        }
      />
    </main>
  );
}

function Carousel({ activeImage, setActiveImage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % InfographicImgs.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + InfographicImgs.length) % InfographicImgs.length
    );
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < visibleCount; i++) {
      visibleImages.push(
        InfographicImgs[(activeIndex + i) % InfographicImgs.length]
      );
    }
    return visibleImages;
  };

  return (
    <section className="carousel-container">
      <Icon
        icon={"icon-park-outline:left"}
        width={30}
        onClick={prevSlide}
        className="carousel-slide"
      />
      {getVisibleImages().map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={
            activeImage === image ? "carousel-item active" : "carousel-item"
          }
          onClick={() => setActiveImage(image)}
        />
      ))}
      <Icon
        icon={"icon-park-outline:right"}
        width={30}
        onClick={nextSlide}
        className="carousel-slide"
      />
    </section>
  );
}

const InfographicImgs = [
  "/infographics1.jpg",
  "/infographics2.jpg",
  "/infographics3.jpg",
  "/infographics4.jpg",
  "/infographics5.jpg",
  "/infographics6.jpg",
  "/infographics7.jpg",
  "/infographics8.jpg",
  "/infographics9.jpg",
];
