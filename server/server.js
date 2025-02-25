import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

//GET agribusiness_companies
app.get("/agribusiness-companies", async (req, res) => {
  db.query("SELECT * FROM agribusiness_companies", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else return res.json(results);
  });
});

//GET company_contacts
app.get("/agribusiness-companies/:id/company-contacts", async (req, res) => {
  const companyId = req.params.id;

  db.query(
    `
    SELECT 
        ac.id AS company_id,
        ac.company_name,
        cc.contact_person,
        cc.contact_number,
        cc.email_address,
        cc.website
    FROM agribusiness_companies ac
    LEFT JOIN company_contacts cc ON ac.id = cc.company_id
    WHERE ac.id = ?;`,
    [companyId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Company not found" });
      }

      const companyData = {
        company_id: results[0].company_id,
        company_name: results[0].company_name,
        contacts: [],
      };

      results.forEach((row) => {
        companyData.contacts.push({
          contact_person: row.contact_person,
          contact_number: row.contact_number,
          email_address: row.email_address,
          website: row.website,
        });
      });

      res.json(companyData.contacts);
    }
  );
});

//GET company_contacts
app.get(
  "/agribusiness-companies/:id/company-products-services",
  async (req, res) => {
    const companyId = req.params.id;

    db.query(
      `
    SELECT 
        ac.id AS company_id,
        ac.company_name,
        cps.product_service_name
    FROM agribusiness_companies ac
    LEFT JOIN company_products_services cps ON ac.id = cps.company_id
    WHERE ac.id = ?;`,
      [companyId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "Company not found" });
        }

        const companyData = {
          company_id: results[0].company_id,
          company_name: results[0].company_name,
          products: [],
        };

        results.forEach((row) => {
          companyData.products.push({
            product_service_name: row.product_service_name,
          });
        });

        res.json(companyData.products);
      }
    );
  }
);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
