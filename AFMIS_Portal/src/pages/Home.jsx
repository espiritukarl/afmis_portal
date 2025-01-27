import "../styles/home.css";
import HomeCard from "../components/HomeCard";
import HomeTrendsGlance from "../components/HomeTrendsGlance";
import SectionPreviews from "../components/SectionPreviews";
import Banner from "../components/Banner";
import PriceReport from "/price_report.jpg";
import Infographics from "/infographics.jpg";
import { eventsList, newsList } from "../components/Data/HomeData";

export function LandingMain() {
  return (
    <main>
      <Banner />
      <article className="afmis-portal-description">
        <p className="roboto-regular">
          The AFMIS Portal consolidates all the market-related systems of the
          Department in a single platform for easy access and unified view of
          information on agricultural commodity prices, supply and other
          relevant market information for policy, planning and decision-making
          purposes.
        </p>
        <p className="article-goals roboto-bold">Goals:</p>
        <ul className="roboto-regular">
          <li>
            Serve as the Market Information dissemination platform of the
            Department
          </li>
          <li>
            Serve as a planning, policy and decision-making tool of the
            Department in providing strategic interventions and solutions
            whenever there are price and supply fluctuations and irregularities.
          </li>
          <li>
            Provide better user experience through simplifying login for
            AMAS/AMAD users handling 2 or more marketing related systems
          </li>
        </ul>
      </article>
      <HomeTrendsGlance />
      <SectionPreviews
        header={"Price Report"}
        imgSrc={PriceReport}
        imgClass={"price-report-img"}
      />
      <SectionPreviews
        header={"Infographics"}
        imgSrc={Infographics}
        imgClass={"infographic-img"}
      />
    </main>
  );
}

export function LandingSide() {
  return (
    <aside>
      <HomeCard
        header={"Events"}
        list={eventsList}
        iconSrc={"fluent:calendar-32-regular"}
        navUrl={"/news/upcoming-events"}
      />
      <HomeCard
        header={"News"}
        list={newsList}
        iconSrc={"system-uicons:newspaper"}
        navUrl={"/news/news-articles"}
      />
    </aside>
  );
}
