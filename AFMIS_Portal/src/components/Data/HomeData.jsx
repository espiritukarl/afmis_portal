export const priceTrends = [
  "Rice",
  "Meat",
  "Vegetables",
  "Fish",
  "Fruits",
  "Others",
];

const label = [
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
];

export const priceTrendData = {
  rice: {
    labels: label,
    data: [30, 35, 40, 38, 36, 42, 48, 50, 52, 47, 45, 40], // Primary line graph
    secondaryData: [25, 30, 32, 34, 33, 36, 40, 42, 45, 43, 41, 38], // Secondary line graph (red)
    barData: [40, 50, 55, 60, 58, 65, 72, 75, 68, 66, 63, 60], // Bar graph data
  },
  meat: {
    labels: label,
    data: [50, 55, 60, 65, 63, 67, 72, 75, 77, 70, 68, 65], // Primary line graph
    secondaryData: [45, 50, 55, 58, 57, 60, 65, 68, 70, 67, 64, 62], // Secondary line graph (red)
    barData: [70, 65, 80, 75, 78, 82, 85, 90, 88, 80, 77, 72], // Bar graph data
  },
  vegetables: {
    labels: label,
    data: [20, 22, 25, 23, 28, 35, 40, 38, 36, 39, 37, 30], // Primary line graph
    secondaryData: [15, 18, 20, 21, 25, 30, 34, 32, 30, 35, 33, 28], // Secondary line graph (red)
    barData: [30, 35, 40, 38, 42, 50, 55, 60, 52, 45, 48, 40], // Bar graph data
  },
  fish: {
    labels: label,
    data: [40, 42, 45, 47, 50, 52, 55, 58, 57, 53, 50, 48], // Primary line graph
    secondaryData: [35, 38, 40, 42, 44, 46, 50, 52, 54, 50, 48, 45], // Secondary line graph (red)
    barData: [60, 55, 50, 65, 70, 75, 72, 68, 66, 62, 58, 55], // Bar graph data
  },
  fruits: {
    labels: label,
    data: [35, 38, 36, 39, 40, 42, 45, 47, 50, 48, 46, 44], // Primary line graph
    secondaryData: [30, 33, 34, 37, 39, 41, 43, 45, 47, 46, 44, 42], // Secondary line graph (red)
    barData: [50, 52, 48, 55, 60, 62, 65, 68, 64, 58, 55, 50], // Bar graph data
  },
  others: {
    labels: label,
    data: [10, 15, 12, 14, 16, 20, 25, 23, 22, 18, 15, 12], // Primary line graph
    secondaryData: [8, 12, 10, 12, 14, 18, 22, 20, 18, 15, 12, 10], // Secondary line graph (red)
    barData: [25, 30, 28, 32, 35, 40, 45, 42, 38, 34, 30, 28], // Bar graph data
  },
};

export const timePeriod = ["Yearly", "Monthly", "Weekly", "Daily"];

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
