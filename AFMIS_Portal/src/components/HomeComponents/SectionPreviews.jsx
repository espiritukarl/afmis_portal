import { useState } from "react";
import Modal from "../Modal/Modal";

export default function SectionPreviews({ header, imgSrc, imgClass }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <h4 className="roboto-medium home-section-headers">{header}</h4>
      <div className="image-wrapper" onClick={() => setIsModalOpen(true)}>
        <div className="section-overlay"></div>
        <img src={imgSrc} alt="" className={imgClass} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={<img src={imgSrc} alt="" className="modal-content-img" />}
      />
    </section>
  );
}
