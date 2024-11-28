import { Link } from "react-router-dom";

export default function SectionPreviews({ header, imgSrc, navUrl, imgClass }) {
  return (
    <section>
      <h4 className="roboto-medium home-section-headers">{header}</h4>
      <div className="image-wrapper">
        <Link className="section-overlay" to={navUrl}></Link>
        <img src={imgSrc} alt="" className={imgClass} />
      </div>
    </section>
  );
}
