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

// GET agribusiness_companies with contacts and products
app.get("/agribusiness-companies", async (req, res) => {
  db.query(
    `
    SELECT 
        ac.id AS company_id,
        ac.company_name,
        ac.street_no,
        ac.street_name,
        ac.barangay,
        ac.city,
        ac.province,
        ac.region,
        ac.zip_code,
        ac.business_type,
        cc.contact_person,
        cc.contact_number,
        cc.email_address,
        cc.website,
        cps.product_service_name
    FROM agribusiness_companies ac
    LEFT JOIN company_contacts cc ON ac.id = cc.company_id
    LEFT JOIN company_products_services cps ON ac.id = cps.company_id;
    `,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const companies = {};

      results.forEach((row) => {
        // Check if the company already exists in the companies object
        if (!companies[row.company_id]) {
          companies[row.company_id] = {
            company_id: row.company_id,
            company_name: row.company_name,
            street_no: row.street_no,
            street_name: row.street_name,
            barangay: row.barangay,
            city: row.city,
            province: row.province,
            region: row.region,
            zip_code: row.zip_code,
            business_type: row.business_type,
            contacts: [],
            products: [],
          };
        }

        // Add contact details if they exist
        if (
          row.contact_person &&
          row.contact_number &&
          row.email_address &&
          row.website
        ) {
          companies[row.company_id].contacts.push({
            contact_person: row.contact_person,
            contact_number: row.contact_number,
            email_address: row.email_address,
            website: row.website,
          });
        }

        // Add product/service details if they exist
        if (row.product_service_name) {
          companies[row.company_id].products.push({
            product_service_name: row.product_service_name,
          });
        }
      });

      // Convert companies object back to an array
      const response = Object.values(companies);
      res.json(response);
    }
  );
});

app.listen(3000);
