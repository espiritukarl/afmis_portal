import SectionTitle from "../../components/SectionTitle";
import NewsCard from "./NewsCard";
import { newsDetails } from "../../Data/NewsDetails";

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
