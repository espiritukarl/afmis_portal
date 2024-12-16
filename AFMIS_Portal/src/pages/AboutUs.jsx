import SectionTitle from "../components/SectionTitle";
import "../styles/aboutUs.css";

export default function AboutUs() {
  return (
    <main>
      <SectionTitle title={"About Us"} />
      <article className="about-us">
        <h4 className=" roboto-bold">OUR MANDATE:</h4>
        <p className="roboto-regular-italic">
          The Agribusiness and Marketing Assistance Service collaborates with
          and provides direct assistance to the private sector, including
          concerned NGOs and POs in marketing ventures and in the conduct of
          market analysis, identification and matching. (AFMA IRR Rule 40).
          <br />
          <br />
          It shall provide a unified market development and investment
          assistance and promotion services mechanism to the Department’s
          external stakeholders in support of the Agriculture and fisheries
          Modernization Act (AFMA) in support of market efficiency and food
          security agenda of the government. (DA Approved Rationalization Plan)
        </p>
      </article>
      <article className="about-us">
        <h4 className=" roboto-bold">FUNCTIONS</h4>
        <ul className="roboto-light">
          <li>
            Develop and strength partnership with private sector and
            agribusiness players in promoting Philippine products, both in the
            domestic and international market.
          </li>
          <li>
            Assist in the preparation of business and institution-building
            plans.
          </li>
          <li>Promote value-adding activities.</li>
          <li>Network and help develop agribusiness enterprises.</li>
          <li>Assist in investments packaging.</li>
          <li>Conduct market-matching or links markets.</li>
          <li>
            Facilitate linkages of farmers’ organizations at the regional and
            provincial levels with urban and population centers and markets.
          </li>
          <li>Promote appropriate product standards and quality management.</li>
          <li>
            Coordinate with other government and DA agencies on matters relating
            to agribusiness and market-related concerns.
          </li>
          <li>
            Support policy reforms relating to market modernization and
            agribusiness development.
          </li>
        </ul>
      </article>
    </main>
  );
}
