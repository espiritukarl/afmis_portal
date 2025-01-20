import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getRegion,
  priceTypes,
  riceCommodity,
  timePeriod,
} from "./Data/HomeData";
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
  const [isOpen, setIsOpen] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    priceTypes: priceTypes[0], //radio
    timePeriod: Object.keys(timePeriod)[3], //radio
    rice: [
      {
        category: "RICE-FOR-ALL",
        selected: ["Well Milled"],
      },
      {
        category: "IMPORTED COMMERCIAL RICE",
        selected: ["Special", "Premium"],
      },
      {
        category: "LOCAL COMMERCIAL RICE",
        selected: ["Regular Milled"],
      },
    ], //ARRAY [] because checkbox
  });

  const generateColor = (category, type) => {
    const hash = [...category, ...type].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const hue = hash % 360; // Use modulo to wrap hue value
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Handler for radio buttons
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for checkboxes
  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;

    setFilterOptions((prev) => {
      const riceFilters = [...prev.rice]; // Clone existing rice filters
      const categoryIndex = riceFilters.findIndex(
        (item) => item.category === category
      );

      if (categoryIndex !== -1) {
        const selectedItems = new Set(riceFilters[categoryIndex].selected);

        if (checked) {
          selectedItems.add(value); // Add the value if checked
        } else {
          selectedItems.delete(value); // Remove the value if unchecked
        }

        riceFilters[categoryIndex].selected = [...selectedItems];
      } else if (checked) {
        // If category not found, add new category
        riceFilters.push({ category, selected: [value] });
      }

      return {
        ...prev,
        rice: riceFilters.filter((item) => item.selected.length > 0), // Remove empty categories
      };
    });
  };

  // Fake Data for Each Type
  const fakeData = {
    Daily: {
      "RICE-FOR-ALL": {
        "Well Milled": [40, 40, 40, 40, 40, 40, 40],
      },
      "IMPORTED COMMERCIAL RICE": {
        Special: [60, 60, 60, 60, 60, 60, 60],
        Premium: [57, 56, 56, 56.5, 56.5, 56, 56],
        "Well Milled": [47.5, 45, 45, 45, 45, 45, 45],
        "Regular Milled": [42, 42, 45, 45, 45, 45, 45],
      },
      "LOCAL COMMERCIAL RICE": {
        Special: [60, 60, 60, 60, 60, 60, 60],
        Premium: [55, 55, 55, 55, 55, 55, 55],
        "Well Milled": [48, 50, 45, 45, 45, 45, 45],
        "Regular Milled": [42, 42, 42, 43.5, 42, 40, 40],
      },
    },
    Weekly: {
      "RICE-FOR-ALL": {
        "Well Milled": Array(52).fill(40),
      },
      "IMPORTED COMMERCIAL RICE": {
        Special: Array(52).fill(56),
        Premium: Array(52).fill(56),
        "Well Milled": Array(52).fill(45),
        "Regular Milled": Array(52).fill(45),
      },
      "LOCAL COMMERCIAL RICE": {
        Special: Array(52).fill(45),
        Premium: Array(52).fill(48),
        "Well Milled": Array(52).fill(45),
        "Regular Milled": Array(52).fill(42),
      },
    },
  };

  const chartData = {
    labels: timePeriod[filterOptions.timePeriod],
    datasets: filterOptions.rice.flatMap(({ category, selected }) =>
      selected.map((type) => {
        const data =
          fakeData[filterOptions.timePeriod]?.[category]?.[type] ||
          Array.from(
            { length: timePeriod[filterOptions.timePeriod].length },
            () => Math.floor(Math.random() * 100) // Replace with actual values here
          );

        return {
          label: `${category}: ${type}`,
          data: data,
          color: generateColor(category, type),
          borderColor: generateColor(category, type),
        };
      })
    ),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensures the Y-axis starts at 0
        min: 0, // Set minimum value
        max: 100, // Set maximum value
        ticks: {
          stepSize: 10, // Optional: Customize the tick interval
        },
        title: {
          display: true,
          text: "Price (Php)",
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
        },
        title: {
          display: true,
          text: filterOptions.timePeriod,
        },
      },
    },
  };

  return (
    <section>
      <h4 className="roboto-medium home-section-headers">
        Price Trends at a Glance
        <div className="filter" onClick={() => setIsOpen(true)}>
          Filter <Icon icon={"cil:filter"} width={15} />
        </div>
        <FilterPopup
          filters={filterOptions}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          handleCheckboxChange={handleCheckboxChange}
          handleRadioChange={handleRadioChange}
        />
      </h4>
      <div style={{ marginTop: "20px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}
function FilterPopup({
  filters,
  isOpen,
  onClose,
  handleCheckboxChange,
  handleRadioChange,
}) {
  if (!isOpen) return null;

  return (
    <div onClick={() => onClose()} className="modal-overlay">
      <div
        className="modal-content filter"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon
          icon={"line-md:close"}
          className="modal-close-button"
          onClick={() => onClose()}
          width={24}
        />
        {/* Time Period */}
        <fieldset>
          <legend>Time Period</legend>
          <div className="filter-options">
            {Object.keys(timePeriod).map((key) => (
              <label key={key} className="roboto-regular ">
                <input
                  type="radio"
                  name="timePeriod"
                  value={key}
                  id={`timePeriod-${key}`}
                  onChange={handleRadioChange}
                  checked={filters.timePeriod === key}
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>
        {/* Price Types */}
        <fieldset>
          <legend>Price Types</legend>
          <div className="filter-options">
            {priceTypes.map((type) => (
              <label key={type} className="roboto-regular ">
                <input
                  type="radio"
                  name="priceTypes"
                  value={type}
                  id={`priceTypes-${type}`}
                  onChange={handleRadioChange}
                  checked={filters.priceTypes === type}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>
        {/* Rice Commodity */}
        <fieldset>
          <legend>Rice Commodities</legend>
          <div className="filter-options">
            {Object.entries(riceCommodity).map(([category, types]) => (
              <div key={category}>
                <h3>{category}</h3>
                <div className="filter-options">
                  {types.map((type) => (
                    <label key={type} className="roboto-regular ">
                      <input
                        type="checkbox"
                        name="rice"
                        value={type}
                        id={`rice-${category}-${type}`}
                        onChange={(e) => handleCheckboxChange(e, category)}
                        checked={filters.rice.some(
                          (item) =>
                            item.category === category &&
                            item.selected.includes(type)
                        )}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        {/* Log selected filters */}
        {console.log("Time Period: ", filters.timePeriod)}
        {console.log("Price Type: ", filters.priceTypes)}
        {console.log("Rice Commodities:")}
        {filters.rice.length > 0
          ? filters.rice.map((item) => {
              console.log(
                "> ",
                `${item.category}: ${item.selected.join(", ")}`
              );
            })
          : console.log("No rice selected")}
        {console.log("Filters: ", filters.rice)}
      </div>
    </div>
  );
}
