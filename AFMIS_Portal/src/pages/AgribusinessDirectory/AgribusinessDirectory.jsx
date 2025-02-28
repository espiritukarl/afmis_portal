import { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";

export default function AgribusinessDirectory() {
  const [companies, setCompanies] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/agribusiness-companies/")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Fetched an error: ", err));
  });

  return (
    <main>
      <SectionTitle title={"Directory of Agribusiness Players"} />
      <ul>
        {companies?.map((company) => (
          <li key={company.id}>
            <ul>
              <li className="roboto-light">
                {company.company_name} {" : "}
                {`${company.street_no} ${company.street_name} ${
                  company.barangay ?? ""
                } ${company.city} ${company.province ?? ""} ${
                  company.region ?? ""
                } ${company.zip_code}`}
              </li>
              <li>...</li>
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
