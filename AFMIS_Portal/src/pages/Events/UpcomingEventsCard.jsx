import "./events.css";

export default function UpcomingEventsCard({ title, author, date, imgSrc }) {
  return (
    <article className="event-card">
      <div className="img-container">
        <img src={imgSrc} alt={`${title} photo`} />
      </div>
      <div className="info-container">
        <div className="top-container">
          <h5 className="event-title roboto-medium">{title}</h5>
          <div className="event-author roboto-light">{author}</div>
        </div>
        <div className="bottom-container">
          <div className="event-date roboto-regular">{date}</div>
          <button className="event-read-more roboto-regular">Read More</button>
        </div>
      </div>
    </article>
  );
}
