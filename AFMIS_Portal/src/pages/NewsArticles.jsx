import SectionTitle from "../components/SectionTitle";
import NewsCard from "../components/NewsCard";
import { newsDetails } from "../components/Data/NewsDetails";

export default function UpcomingEvents() {
  return (
    <main>
      <SectionTitle title={"Other News"} />
      {newsDetails.map((news) => {
        return (
          <NewsCard
            key={news.title}
            title={news.title}
            news={news.news}
            author={news.author}
            date={news.date}
            imgSrc={news.imgSrc}
          />
        );
      })}
    </main>
  );
}
