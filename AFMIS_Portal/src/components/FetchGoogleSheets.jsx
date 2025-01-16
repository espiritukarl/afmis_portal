import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Your OAuth 2.0 Client ID
const API_KEY = process.env.GOOGLE_API_KEY; // Your Google API Key
const SHEET_ID = "1ME7YKJyw_bwDyNDF86M-G6CsVi4_Fw8kVbwtmsie4cU"; // The ID of your Google Sheet
const LABEL_RANGES = "Summary (with Weekends)!A9:B19";
const WEEKLY_RANGES = "Summary (with Weekends)!C9:G19";
const DAILY_DATES_RANGES = "Daily Prevailing!D7:AJ7";
const DAILY_RANGES_PREVAILING = "Daily Prevailing!D9:AJ19";
const DAILY_RANGES_AVE = "Daily Average!D9:AJ19";
const EXCLUDED_ROWS = [10, 15]; // Rows to exclude

export default function GoogleSheetsExample() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  class Rice {
    constructor(name, specifications, prices) {
      this.name = name;
      this.specifications = specifications;
      this.prices = prices;
    }
  }
  class Prices {
    constructor(prevailing, low, high, average, median) {
      this.prevailing = prevailing;
      this.low = low;
      this.high = high;
      this.average = average;
      this.median = median;
    }
  }

  useEffect(() => {
    function start() {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: [
              "https://sheets.googleapis.com/$discovery/rest?version=v4",
            ],
            scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            if (!authInstance) {
              console.error("Auth instance is null");
            }
          })
          .catch((err) => {
            console.error("Error initializing gapi", err);
          });
      });
    }

    start();
  }, []);

  const handleSignIn = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance
        .signIn()
        .then(() => {
          setIsSignedIn(true); // Update state after successful sign-in
          getSheetData(); // Fetch data after sign-in
        })
        .catch((error) => {
          console.error("Sign-in error", error);
        });
    }
  };

  const getSheetData = () => {
    //WEEKLY
    gapi.client.sheets.spreadsheets.values
      .batchGet({
        spreadsheetId: SHEET_ID,
        ranges: RANGES,
      })
      .then((response) => {
        const result = response.result.valueRanges;

        // Process the data and exclude unwanted rows
        const filteredData = result.map((rangeData, rangeIndex) => {
          const startRow = parseInt(
            RANGES[rangeIndex].match(/\!(\w)(\d+):/)[2]
          );
          return rangeData.values.filter(
            (_, rowIndex) => !EXCLUDED_ROWS.includes(startRow + rowIndex)
          );
        });

        let week1prices = filteredData[1].map(
          (price) =>
            new Prices(price[0], price[1], price[2], price[3], price[4])
        );
        let week1 = filteredData[0].map(
          (rice, index) => new Rice(rice[0], rice[1], week1prices[index])
        );

        setWeeklyData(filteredData);
      })
      .catch((error) => console.error("Error fetching data", error));

    //DAILY
    gapi.client.sheets.spreadsheets.values
      .batchGet({
        spreadsheetId: SHEET_ID,
        ranges: [DAILY_RANGES_AVE, DAILY_RANGES_PREVAILING],
      })
      .then((response) => {
        const result = response.result.valueRanges;
        const filteredData = result.map((rangeData, rangeIndex) => {
          const startRow = parseInt(
            RANGES[rangeIndex].match(/\!(\w)(\d+):/)[2]
          );
          return rangeData.values.filter(
            (_, rowIndex) => !EXCLUDED_ROWS.includes(startRow + rowIndex)
          );
        });
        let finalData = filteredData.map((riceArr) =>
          riceArr.map((val) => val.filter((price) => price != ""))
        );
        console.log(finalData);
        new Rice();
        setDailyData(finalData);
      });
  };

  return (
    <div>
      <h1>Google Sheets API Example</h1>
      {!isSignedIn ? (
        <button onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <div>
          <h2>Data from Google Sheets:</h2>
          {weeklyData.length > 0 ? (
            weeklyData.map((rangeData, rangeIndex) => (
              <div key={rangeIndex}>
                <pre>{JSON.stringify(rangeData, null, 2)}</pre>
              </div>
            ))
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      )}
    </div>
  );
}

//CONVERT Bijective Base-26 system for Google Sheets Range
const baseCode = "A".charCodeAt(0) - 1;

function toBb26(n) {
  let chars = [];
  while (n > 0) {
    const d = ((n - 1) % 26) + 1;
    chars.unshift(String.fromCharCode(baseCode + d));
    n = (n - d) / 26;
  }
  return chars.join("");
}

function fromBb26(x) {
  let ret = 0;
  for (const c of Array.from(x)) {
    ret *= 26;
    ret += c.charCodeAt(0) - baseCode;
  }
  return ret;
}

function increment(x, n = 6) {
  return toBb26(fromBb26(x) + n);
}

//TEMP DATA:

// WEEKLY:
// [LABEL]
// [PRICES]
// [WEEK] <-- increment days (0 to 6), increment%6===0 => {increment = 0; week++}
// {
//  name: label[0]
//  specification: label[1]
//  price: [{
//   week: week
//   prevailing: prices[0]
//   low: prices[1]
//   high: prices[2]
//   average: prices[3]
//   median: prices[4]
//  }]
// }

// DAILY:
// [DAY]
// [LABEL]
// [PRICES]
// {
//  name: label[0]
//  specification: label[1]
//  unit: label[3]
//  price: [{
//   day: day[0]
//   prevailing: prices[0]
//   average: prices[1]
//  }]
// }
