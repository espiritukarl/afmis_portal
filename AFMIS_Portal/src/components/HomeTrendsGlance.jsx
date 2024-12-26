import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getRegion, timePeriod } from "./Data/HomeData";
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
  const [showDropdown, setShowDropdown] = useState({
    region: false,
    time: false,
  });

  function isChosen(category) {
    return chosenPriceTrend === category;
  }

  async function getRegion() {
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
    console.log(data);
    return data.map((region) => region.regionName);
  }

  return (
    <section>
      <h4 className="roboto-medium home-section-headers">
        Price Trends at a Glance
      </h4>
      <div className="selection-bar-container roboto-regular">
        <div
          className="selection-bar-choice selection-bar-chosen"
          onClick={() => console.log(getRegion())}
        >
          Region I{" "}
          <Icon
            icon={showDropdown.region ? "bxs:up-arrow" : "bxs:down-arrow"}
            width={10}
          />
        </div>
        <div
          className="selection-bar-choice "
          onClick={() =>
            setShowDropdown((prevInfo) => ({
              ...prevInfo,
              time: !showDropdown.time,
            }))
          }
        >
          {timePeriod[0]}{" "}
          <Icon
            icon={showDropdown.time ? "bxs:up-arrow" : "bxs:down-arrow"}
            width={10}
          />
          <DropdownChoices show={showDropdown.time} dataArr={timePeriod} />
        </div>
      </div>
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

function DropdownChoices({ show, dataArr }) {
  if (!show) return null;

  return (
    <div className="dropdown-container">
      {dataArr.map((choice) => {
        return <div className="item">{choice}</div>;
      })}
    </div>
  );
}
