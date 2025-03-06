import { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";

export default function AgribusinessDirectory() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/agribusiness-companies/")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Fetched an error: ", err));
  }, []);

  return (
    <main>
      <SectionTitle title={"Directory of Agribusiness Players"} />
      <ul>
        {companies?.map((company) => (
          <li key={company.id}>
            <ul>
              <li className="roboto-light">
                {company.company_name} {" : "}
                <br />
                Address:
                <ul>
                  <li>{company.street_no}</li>
                  <li>{company.street_name}</li>
                  <li>{company.barangay}</li>
                  <li>{company.city}</li>
                  <li>{company.province}</li>
                  <li>{company.region}</li>
                  <li>{company.zip_code}</li>
                </ul>
                Contact:
                <ul>
                  {company.contacts.length > 0 ? (
                    company.contacts?.map((contact) => (
                      <>
                        <li>{contact.contact_person}</li>
                        <li>{contact.contact_number}</li>
                        <li>{contact.email_address}</li>
                        <li>{contact.website}</li>
                      </>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
                Products:
                <ul>
                  {company.products.length > 0 ? (
                    company.products?.map((product) => (
                      <li>{product.product_service_name}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </li>
              <br />
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
