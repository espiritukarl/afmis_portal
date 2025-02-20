import SectionTitle from "../../components/SectionTitle";
import Table from "../../components/Table/Table";
import { priceReports } from "../../data/PriceReports";
import "../../components/Table/table.css";

export default function PriceReport() {
  return (
    <main>
      <SectionTitle title={"Daily Price Report"} />
      <div className="table-graphic">
        <img src="/price_report.jpg" alt="Price Report image" />
      </div>

      <Table rawData={priceReports} title={"Other Daily Price Reports"} />
    </main>
  );
}
