import SectionTitle from "../components/SectionTitle";
import Table from "../components/Table";
import { priceReports } from "../components/Data/PriceReports";

export default function PriceReport() {
  return (
    <main>
      <SectionTitle title={"Daily Price Report"} />
      <img
        src="/price_report.jpg"
        alt="Price Report image"
        className="price-report-graphic"
      />
      <Table
        rawData={priceReports}
        title={"Other Daily Price Reports"}
        className="price-report-table"
      />
    </main>
  );
}
