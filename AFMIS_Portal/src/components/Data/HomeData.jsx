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
  Yearly: [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
  ].reverse(),
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
  Weekly: Array.apply(null, { length: 52 }).map(Number.call, Number),
  Daily: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], //is this correct?!?!
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
