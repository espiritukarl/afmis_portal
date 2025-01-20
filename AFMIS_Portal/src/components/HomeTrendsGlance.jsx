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
  const [chosenPriceTrend, setChosenPriceTrend] = useState("Rice");
  const [regions, setRegions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const defaultFilters = {
    priceTypes: priceTypes[0], //radio
    timePeriod: Object.keys(timePeriod)[2], //radio
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
  };
  const [filterOptions, setFilterOptions] = useState(defaultFilters);

  // const [showDropdown, setShowDropdown] = useState({
  //   region: false,
  //   time: false,
  // });

  // const [chosen, setChosen] = useState({
  //   region: regions[0] || "Region I",
  //   time: timePeriod.monthly[0],
  // });

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

  useEffect(() => {
    async function fetchRegions() {
      try {
        const regionNames = await getRegion();
        setRegions(regionNames);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    }

    fetchRegions();
  }, []);

  function isChosen(category) {
    return chosenPriceTrend === category;
  }

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
      {/* <div className="selection-bar-container roboto-regular">
       <div
          className="selection-bar-choice selection-bar-chosen"
          onClick={() =>
            setShowDropdown((prevInfo) => ({
              ...prevInfo,
              region: !showDropdown.region,
              time: false,
            }))
          }
        >
          {chosen.region}{" "}
          <Icon
            icon={showDropdown.region ? "bxs:up-arrow" : "bxs:down-arrow"}
            width={10}
          />
          <DropdownChoices
            show={showDropdown.region}
            dataArr={regions}
            type="region"
            setChosen={setChosen}
          />
        </div>
        <div
          className="selection-bar-choice "
          onClick={() =>
            setShowDropdown((prevInfo) => ({
              ...prevInfo,
              region: false,
              time: !showDropdown.time,
            }))
          }
        >
          {chosen.time}{" "}
          <Icon
            icon={showDropdown.time ? "bxs:up-arrow" : "bxs:down-arrow"}
            width={10}
          />
          <DropdownChoices
            show={showDropdown.time}
            dataArr={timePeriod.monthly}
            type="time"
            setChosen={setChosen}
          />
        </div>
      </div> */}
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

// function DropdownChoices({ show, dataArr, type, setChosen }) {
//   if (!show) return null;

//   return (
//     <div className="dropdown-container">
//       {dataArr.map((choice) => {
//         return (
//           <div
//             className="item roboto-regular"
//             key={dataArr + choice}
//             onClick={() =>
//               setChosen((prevInfo) => ({
//                 ...prevInfo,
//                 [type]: choice,
//               }))
//             }
//           >
//             {choice}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

//type options = "prevailing, high-low range, median, average"
//time period = "yearly, monthly, weekly, daily"
//rice = get from gsheeeeeeets
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Icon
          icon={"line-md:close"}
          className="modal-close-button"
          onClick={() => {
            onClose();
            setLogInModal(true);
          }}
          width={24}
        />
        {/* Time Period */}
        <fieldset>
          <legend>Time Period</legend>
          {Object.keys(timePeriod).map((key) => (
            <label key={key}>
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
        </fieldset>
        {/* Price Types */}
        <fieldset>
          <legend>Price Types</legend>
          {priceTypes.map((type) => (
            <label key={type}>
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
        </fieldset>
        {/* Rice Commodity */}
        <fieldset>
          <legend>Rice Commodities</legend>
          {Object.entries(riceCommodity).map(([category, types]) => (
            <div key={category}>
              <h3>{category}</h3>
              {types.map((type) => (
                <label key={type}>
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
          ))}
        </fieldset>
        {/* Display selected filters */}
        <span>
          <h2>Selected Filters</h2>
          <p>
            <strong>Time Period:</strong> {filters.timePeriod || "None"}
          </p>
          <p>
            <strong>Price Type:</strong> {filters.priceTypes || "None"}
          </p>
          <p>
            <strong>Rice Commodities:</strong>{" "}
            <ul>
              {filters.rice.length > 0
                ? filters.rice.map((item) => (
                    <li>
                      {item.category}: {item.selected.join(", ")}
                    </li>
                  ))
                : "None"}
            </ul>
          </p>
        </span>
      </div>
    </div>
  );
}

//priceTrendData
// rice_name: {
//  specifications: smthn,
//  units: "kg"
//  dailyPrice: {day: n, average: n, prevailing: n}, how day?????
//  weeklyPrice: {week: n, prevailing low high average median},
//  monthlyPrice: {idk yet LOLLLL}
// }
