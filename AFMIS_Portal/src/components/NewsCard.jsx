import "../styles/news.css";

export default function NewsCard({ title, news, author, date, imgSrc }) {
  return (
    <article className="news-card">
      <div className="news-container">
        <div className="news-img-container">
          <img src={imgSrc} alt="" />
        </div>
        <div className="news-info-container">
          <h4 className="roboto-bold">{title}</h4>
          <TruncatedText text={news || ""} maxLength={350} />

          <button className="news-read-more roboto-regular">Read More</button>
        </div>
      </div>
      <div className="news-article-info">
        <span className="roboto-medium">{`Author: ${author} | ${date}`}</span>
      </div>
    </article>
  );
}

function TruncatedText({ text, maxLength }) {
  return (
    <p className="roboto-light">
      {text.length > maxLength ? text.slice(0, maxLength) + "..." : text}
    </p>
  );
}
