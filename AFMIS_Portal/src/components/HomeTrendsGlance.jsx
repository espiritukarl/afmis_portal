import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  priceTypes,
  riceCommodity,
  timePeriod,
  fakeData,
} from "./Data/HomeData";

export default function PriceTrendsGlance({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [chartOptions, setChartOptions] = useState({});

  const [filterOptions, setFilterOptions] = useState({
    priceTypes: priceTypes[0],
    timePeriod: Object.keys(timePeriod)[3],
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
    ],
  });

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setFilterOptions((prev) => {
      const riceFilters = [...prev.rice];
      const categoryIndex = riceFilters.findIndex(
        (item) => item.category === category
      );

      if (categoryIndex !== -1) {
        const selected = new Set(riceFilters[categoryIndex].selected);
        checked ? selected.add(value) : selected.delete(value);
        riceFilters[categoryIndex].selected = [...selected];
      } else if (checked) {
        riceFilters.push({ category, selected: [value] });
      }

      return {
        ...prev,
        rice: riceFilters.filter((item) => item.selected.length > 0),
      };
    });
  };

  useEffect(() => {
    const series = filterOptions.rice.flatMap(({ category, selected }) =>
      selected.map((type) => ({
        name: `${category}: ${type}`,
        data: fakeData[filterOptions.timePeriod][category][type][
          filterOptions.priceTypes
        ],
      }))
    );

    // Calculate min/max across all selected data
    const allValues = series.flatMap((s) => s.data);
    const min = Math.floor(Math.min(...allValues));
    const max = Math.ceil(Math.max(...allValues));

    setChartOptions({
      chart: { type: "line" },
      title: { text: "" },
      xAxis: {
        categories: timePeriod[filterOptions.timePeriod],
        title: { text: filterOptions.timePeriod },
        labels: { rotation: -45 },
      },
      yAxis: {
        title: { text: "Price (Php)" },
        min: min - 10 > 0 ? min - 10 : min,
        max: max + 10 < 100 ? max + 10 : max,
        allowDecimals: false,
        labels: {
          formatter: function () {
            return this.value.toFixed(0); // Ensure integer labels
          },
        },
      },
      series,
      legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      },
      tooltip: { shared: true },
      responsive: {
        rules: [
          {
            condition: { maxWidth: 500 },
            chartOptions: { legend: { enabled: false } },
          },
        ],
      },
    });
  }, [filterOptions]);

  return (
    <section>
      <h4 className="roboto-medium home-section-headers">
        Price Trends at a Glance
        <div
          className={isOpen ? "filter active" : "filter"}
          onClick={() => setIsOpen(!isOpen)}
        >
          Filter <Icon icon="cil:filter" width={15} />
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
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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
    <div className="filter-overlay" onClick={(e) => e.stopPropagation()}>
      <fieldset>
        <legend>Time Period</legend>
        <div className="filter-options">
          {Object.keys(timePeriod).map((key) => (
            <label key={key} className="roboto-regular">
              <input
                type="radio"
                name="timePeriod"
                value={key}
                checked={filters.timePeriod === key}
                onChange={handleRadioChange}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Price Types</legend>
        <div className="filter-options">
          {priceTypes.map((type) => (
            <label key={type} className="roboto-regular">
              <input
                type="radio"
                name="priceTypes"
                value={type}
                checked={filters.priceTypes === type}
                onChange={handleRadioChange}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Rice Commodities</legend>
        <div className="filter-options">
          {Object.entries(riceCommodity).map(([category, types]) => (
            <div key={category}>
              <h3>{category}</h3>
              <div className="filter-options">
                {types.map((type) => (
                  <label key={type} className="roboto-regular">
                    <input
                      type="checkbox"
                      value={type}
                      checked={filters.rice.some(
                        (item) =>
                          item.category === category &&
                          item.selected.includes(type)
                      )}
                      onChange={(e) => handleCheckboxChange(e, category)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
