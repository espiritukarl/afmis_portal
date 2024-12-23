import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceTrendsGlance({ priceTrends, priceTrendData }) {
  const [chosenPriceTrend, setChosenPriceTrend] = useState("Rice");

  function isChosen(category) {
    return chosenPriceTrend === category;
  }

  return (
    <section>
      <h4 className="roboto-medium home-section-headers">
        Price Trends at a Glance
      </h4>
      <div className="selection-bar-container roboto-regular">
        {priceTrends.map((category) => (
          <div
            key={category}
            className={`selection-bar-choice ${
              isChosen(category) ? "selection-bar-chosen" : ""
            }`}
            onClick={() => setChosenPriceTrend(category)}
          >
            {category}
          </div>
        ))}
      </div>
      {priceTrends.map((category) => {
        if (isChosen(category)) {
          const trendData = priceTrendData[category.toLowerCase()];
          const chartData = {
            labels: trendData.labels,
            datasets: [
              {
                type: "line",
                label: `${category} Prices`,
                data: trendData.data,
                borderColor: "blue",
              },
              {
                type: "line",
                label: `${category} 2 Prices`,
                data: trendData.secondaryData,
                borderColor: "red",
              },
              {
                type: "bar",
                label: "Sales data",
                data: trendData.barData,
                backgroundColor: "rgba(75,192,192,0.5)",
              },
            ],
          };

          const options = {
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
            },
            scales: {
              y: {
                beginAtZero: true, // Ensures the Y-axis always starts at 0
                max: 100,
              },
            },
          };

          return (
            <div key={`${category}ischosen`}>
              <Line
                data={chartData}
                options={options}
                className="price-trends-chart"
              />
            </div>
          );
        }
      })}
    </section>
  );
}
