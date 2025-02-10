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

//HIGHCHARTS FULLSCREEN + EXPORT AS IMAGE
import "highcharts/modules/exporting";
import "highcharts/modules/offline-exporting";
import "highcharts/modules/export-data";
import { FilterRange } from "./FilterRange";

export default function PriceTrendsGlance() {
  const [isOpen, setIsOpen] = useState(false);
  const [chartOptions, setChartOptions] = useState({});
  const [yearRange, setYearRange] = useState({
    start: timePeriod["Yearly"][0],
    end: timePeriod["Yearly"][timePeriod["Yearly"].length - 1],
  });

  const [filterOptions, setFilterOptions] = useState({
    priceTypes: [priceTypes[0]],
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

  const handleRiceCheckbox = (e, category) => {
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

  const handlePriceTypeCheckbox = (e) => {
    const { value, checked } = e.target;
    setFilterOptions((prev) => ({
      ...prev,
      priceTypes: checked
        ? [...prev.priceTypes, value]
        : prev.priceTypes.filter((type) => type !== value),
    }));
  };

  const handleYearRangeChange = (e, type) => {
    const value = parseInt(e.target.value);
    setYearRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const riceColors = Highcharts.getOptions().colors;

  useEffect(() => {
    // Create a map of rice types to color index
    const riceColorMap = new Map();
    let colorIndex = 0;
    const startIndex = timePeriod["Yearly"].indexOf(yearRange.start);
    const endIndex = timePeriod["Yearly"].indexOf(yearRange.end) + 1;
    const updatedYearRange = timePeriod["Yearly"].slice(startIndex, endIndex);

    const series = filterOptions.rice.flatMap(({ category, selected }) =>
      selected.flatMap((riceType) => {
        // Get or create color index for this rice type
        if (!riceColorMap.has(riceType)) {
          riceColorMap.set(riceType, colorIndex++);
        }
        const baseColor =
          riceColors[riceColorMap.get(riceType) % riceColors.length];

        return filterOptions.priceTypes.map((priceType, priceIdx) => ({
          name: `${category.split(" ")[0]}: ${riceType} (${priceType})`,
          color: Highcharts.color(baseColor)
            .brighten(priceIdx * -0.2)
            .get(),
          dashStyle: ["Solid", "Dash", "Dot"][priceIdx % 3],
          data:
            filterOptions.timePeriod === "Yearly"
              ? fakeData[filterOptions.timePeriod]?.[category]?.[riceType]?.[
                  priceType
                ].slice(startIndex, endIndex)
              : filterOptions.timePeriod === "Monthly"
              ? fakeData[filterOptions.timePeriod]?.[category]?.[riceType]?.[
                  priceType
                ] //ADD MONTHLY SHT HERE FOR NEXT
              : fakeData[filterOptions.timePeriod]?.[category]?.[riceType]?.[
                  priceType
                ] || [],
        }));
      })
    );

    // Calculate yAxis min/max
    const allValues = series.flatMap((s) => s.data).filter(Number.isFinite);
    const min = allValues.length ? Math.floor(Math.min(...allValues)) : 0;
    const max = allValues.length ? Math.ceil(Math.max(...allValues)) : 100;

    setChartOptions({
      chart: { type: "line" },
      title: { text: " " },
      xAxis: {
        categories:
          filterOptions.timePeriod === "Yearly"
            ? updatedYearRange
            : timePeriod[filterOptions.timePeriod],
        title: { text: `Time period (${filterOptions.timePeriod})` },
        labels: { rotation: -45 },
        min: 0.5,
      },
      yAxis: {
        title: { text: "Price (Php)" },
        min: Math.max(0, min),
        max: max + 1,
        allowDecimals: false,
        labels: {
          formatter: function () {
            return this.value.toFixed(0);
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
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
      },
      credits: {
        enabled: false,
      },
      exporting: {
        filename: "AFMIS-Portal-PriceTrends",
        sourceWidth: 1200,
        sourceHeight: 675,
      },
    });
  }, [filterOptions, yearRange]);

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
          yearRange={yearRange}
          handleRiceCheckbox={handleRiceCheckbox}
          handlePriceTypeCheckbox={handlePriceTypeCheckbox}
          handleRadioChange={handleRadioChange}
          handleYearRangeChange={handleYearRangeChange}
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
  yearRange,
  handleYearRangeChange,
  handleRiceCheckbox,
  handlePriceTypeCheckbox,
  handleRadioChange,
}) {
  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={(e) => e.stopPropagation()}>
      <fieldset>
        <legend>Time Period</legend>
        <div className="filter-options">
          {Object.keys(timePeriod).map((key) => (
            <>
              <label key={key} className="roboto-regular">
                <input
                  type="radio"
                  name="timePeriod"
                  value={key}
                  checked={filters.timePeriod === key}
                  onChange={handleRadioChange}
                />
                <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              </label>
              {filters.timePeriod === "Yearly" && key === "Yearly" && (
                <FilterRange
                  yearRange={yearRange}
                  handleYearRangeChange={handleYearRangeChange}
                />
              )}
            </>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Price Types</legend>
        <div className="filter-options">
          {priceTypes.map((type) => (
            <label key={type} className="roboto-regular">
              <input
                type="checkbox"
                value={type}
                checked={filters.priceTypes.includes(type)}
                onChange={handlePriceTypeCheckbox}
              />
              <div>{type}</div>
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
                      onChange={(e) => handleRiceCheckbox(e, category)}
                    />
                    <div>{type}</div>
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
