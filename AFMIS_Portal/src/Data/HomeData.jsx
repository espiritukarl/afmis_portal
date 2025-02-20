export async function getRegion() {
  const response = await fetch("https://psgc.gitlab.io/api/regions/", {
    method: "GET",
    headers: {
      Accept: "text/html",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch regions data");
  }
  const text = await response.text();
  const data = JSON.parse(text);
  return data.map((region) => region.regionName);
}

export const priceTypes = ["Prevailing", "Low", "High", "Average", "Median"];
export const timePeriod = {
  Yearly: Array.from({ length: 25 }, (_, index) => index + 2001),
  Monthly: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  Weekly: Array.from({ length: 52 }, (_, index) => index + 1),
  Daily: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], //is this correct?!?!
};

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
export const monthlyData = timePeriod.Yearly.flatMap((year) =>
  timePeriod.Monthly.map((month) => ({ month, year }))
).filter(
  ({ month, year }) =>
    year < currentYear ||
    (year === currentYear && timePeriod.Monthly.indexOf(month) <= currentMonth)
);

const generatePriceData = (base, variation) => ({
  Prevailing: base,
  Low: base.map((v) => Math.round(v - Math.random() * variation)),
  High: base.map((v) => Math.round(v + Math.random() * variation)),
  Average: base.map((v) => Math.round(v - Math.random() * variation * 0.3)),
  Median: base.map((v) => Math.round(v + Math.random() * variation * 0.2)),
});

//dummy data:
export const fakeData = {
  Daily: {
    "RICE-FOR-ALL": {
      "Well Milled": generatePriceData([42, 43, 42, 43, 42, 43], 1.5),
    },
    "IMPORTED COMMERCIAL RICE": {
      Special: generatePriceData([55, 54, 53, 54, 55, 55], 2.0),
      Premium: generatePriceData([52, 52, 52, 49, 51, 52], 1.8),
      "Well Milled": generatePriceData([48, 50, 51, 48, 48, 48], 1.2),
      "Regular Milled": generatePriceData([45, 45, 45, 45, 45, 45], 0.5),
    },
    "LOCAL COMMERCIAL RICE": {
      Special: generatePriceData([50, 49, 50, 50, 52, 50], 1.5),
      Premium: generatePriceData([47, 45, 47, 46, 47, 47], 1.0),
      "Well Milled": generatePriceData([44, 44, 43, 44, 44, 43], 0.8),
      "Regular Milled": generatePriceData([40, 42, 41, 44, 41, 41], 1.2),
    },
  },
  Weekly: {
    "RICE-FOR-ALL": {
      "Well Milled": generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(42.5 + Math.sin(i / 4) * 1.5)
        ),
        2.5
      ),
    },
    "IMPORTED COMMERCIAL RICE": {
      Special: generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(54.0 + Math.cos(i / 3) * 1.2)
        ),
        3.0
      ),
      Premium: generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(51.5 + Math.sin(i / 5) * 0.8)
        ),
        2.0
      ),
      "Well Milled": generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(47.5 + Math.cos(i / 4) * 0.7)
        ),
        1.5
      ),
      "Regular Milled": generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(44.5 + Math.sin(i / 6) * 0.6)
        ),
        1.0
      ),
    },
    "LOCAL COMMERCIAL RICE": {
      Special: generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(49.0 + Math.cos(i / 4) * 1.0)
        ),
        2.0
      ),
      Premium: generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(46.5 + Math.sin(i / 5) * 0.9)
        ),
        1.5
      ),
      "Well Milled": generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(43.5 + Math.cos(i / 7) * 0.5)
        ),
        1.2
      ),
      "Regular Milled": generatePriceData(
        Array.from({ length: 52 }, (_, i) =>
          Math.round(40.5 + Math.sin(i / 8) * 0.4)
        ),
        1.0
      ),
    },
  },
  Monthly: {
    "RICE-FOR-ALL": {
      "Well Milled": generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(42.5 + Math.sin(i / 2) * 2)
        ),
        3.0
      ),
    },
    "IMPORTED COMMERCIAL RICE": {
      Special: generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(54.0 + Math.cos(i / 3) * 3)
        ),
        4.0
      ),
      Premium: generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(51.5 + Math.sin(i / 5) * 2.5)
        ),
        3.0
      ),
      "Well Milled": generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(47.5 + Math.cos(i / 4) * 1.5)
        ),
        2.5
      ),
      "Regular Milled": generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(44.5 + Math.sin(i / 6) * 1.8)
        ),
        2.0
      ),
    },
    "LOCAL COMMERCIAL RICE": {
      Special: generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(49.0 + Math.cos(i / 4) * 2.2)
        ),
        3.0
      ),
      Premium: generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(46.5 + Math.sin(i / 5) * 2.0)
        ),
        2.5
      ),
      "Well Milled": generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(43.5 + Math.cos(i / 7) * 1.2)
        ),
        2.0
      ),
      "Regular Milled": generatePriceData(
        Array.from({ length: monthlyData.length }, (_, i) =>
          Math.round(40.5 + Math.sin(i / 8) * 1.5)
        ),
        1.8
      ),
    },
  },
  Yearly: {
    "RICE-FOR-ALL": {
      "Well Milled": generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(42 + i * 0.8 + Math.sin(i) * 1.2)
        ),
        2.5
      ),
    },
    "IMPORTED COMMERCIAL RICE": {
      Special: generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(54 + i * 1.2 + Math.cos(i) * 1.5)
        ),
        3.0
      ),
      Premium: generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(51 + i * 0.9 + Math.sin(i) * 1.1)
        ),
        2.5
      ),
      "Well Milled": generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(47 + i * 0.7 + Math.cos(i) * 0.8)
        ),
        2.0
      ),
      "Regular Milled": generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(44 + i * 0.5 + Math.sin(i) * 0.6)
        ),
        1.5
      ),
    },
    "LOCAL COMMERCIAL RICE": {
      Special: generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(49 + i * 0.6 + Math.cos(i) * 1.0)
        ),
        2.0
      ),
      Premium: generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(46 + i * 0.5 + Math.sin(i) * 0.9)
        ),
        1.8
      ),
      "Well Milled": generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(43 + i * 0.4 + Math.cos(i) * 0.7)
        ),
        1.5
      ),
      "Regular Milled": generatePriceData(
        Array.from({ length: timePeriod["Yearly"].length }, (_, i) =>
          Math.round(40 + i * 0.3 + Math.sin(i) * 0.5)
        ),
        1.2
      ),
    },
  },
};

export const riceCommodity = {
  "RICE-FOR-ALL": ["Well Milled"],
  "IMPORTED COMMERCIAL RICE": [
    "Special",
    "Premium",
    "Well Milled",
    "Regular Milled",
  ],
  "LOCAL COMMERCIAL RICE": [
    "Special",
    "Premium",
    "Well Milled",
    "Regular Milled",
  ],
};
export const eventsList = [
  {
    id: 123,
    title: "Shipment of Hass Avocado",
    date: "18 Nov 2024",
  },
  {
    id: 234,
    title: "Distribution of Indemnity Checks in Mindoro",
    date: "14 Nov 2024",
  },
  {
    id: 345,
    title: "Ginger Seedlings Distribution",
    date: "12 Nov 2024",
  },
];

export const newsList = [
  {
    id: 12,
    title: "Stake holders convene to harmonize efforts for Rice Industry",
    date: "18 Oct 2024",
  },
  {
    id: 23,
    title: "DA supports biotech for food safety and food security",
    date: "18 Oct 2024",
  },
];
