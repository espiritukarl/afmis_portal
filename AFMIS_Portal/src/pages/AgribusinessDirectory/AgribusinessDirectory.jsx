import { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";

export default function AgribusinessDirectory() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/agribusiness-companies/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Fetched an error: ", err));
  });

  return (
    <main>
      <SectionTitle title={"Directory of Agribusiness Players"} />
      <ul>
        {data?.map((company) => (
          <li key={company.id}>
            <ul>
              <li>
                {company.company_name} -{" "}
                {`${company.street_no} ${company.street_name}, Brgy. ${
                  company.barangay
                }, ${company.city}, ${company.province ?? company.region}`}
              </li>
              <li>...</li>
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
