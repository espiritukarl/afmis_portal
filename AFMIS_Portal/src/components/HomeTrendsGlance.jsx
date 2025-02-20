import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  priceTypes,
  timePeriod,
  fakeData,
  monthlyData,
} from "../Data/HomeData";

//HIGHCHARTS FULLSCREEN + EXPORT AS IMAGE
import "highcharts/modules/exporting";
import "highcharts/modules/offline-exporting";
import "highcharts/modules/export-data";
import "highcharts/modules/accessibility";
import FilterPopup from "./FilterPopup";

const currentMonth = new Date().getMonth();

const yearArray = timePeriod["Yearly"];

function checkMonth(index) {
  if (index >= timePeriod.Monthly.length) return 0; // Wrap around to January
  return index;
}

export default function PriceTrendsGlance() {
  const [chartKey, setChartKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [chartOptions, setChartOptions] = useState({});
  const [yearRange, setYearRange] = useState({
    start: yearArray[0],
    end: yearArray[yearArray.length - 1],
  });
  const [monthRange, setMonthRange] = useState({
    start: {
      year: 2023,
      month: checkMonth(currentMonth + 1),
    },
    end: {
      year: yearRange.end,
      month: currentMonth,
    },
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

  const riceColors = Highcharts.getOptions().colors;

  useEffect(() => {
    // Create a map of rice types to color index
    const riceColorMap = new Map();
    let colorIndex = 0;
    const startYearIndex = yearArray.indexOf(yearRange.start);
    const endYearIndex = yearArray.indexOf(yearRange.end) + 1;
    const updatedYearRange = yearArray.slice(startYearIndex, endYearIndex);
    const startMonthIndex = monthlyData.findIndex(
      (item) =>
        item.month === timePeriod.Monthly[monthRange.start.month] &&
        item.year === monthRange.start.year
    );
    const endMonthIndex =
      monthlyData.findIndex(
        (item) =>
          item.month === timePeriod.Monthly[monthRange.end.month] &&
          item.year === monthRange.end.year
      ) + 1;
    const updatedMonthRage = monthlyData.slice(startMonthIndex, endMonthIndex);

    const series = filterOptions.rice.flatMap(({ category, selected }) =>
      selected.flatMap((riceType) => {
        // Get or create color index for this rice type
        if (!riceColorMap.has(riceType)) {
          riceColorMap.set(riceType, colorIndex++);
        }
        const baseColor =
          riceColors[riceColorMap.get(riceType) % riceColors.length];

        return filterOptions.priceTypes.map((priceType, priceIdx) => {
          const name = `${category.split(" ")[0]}: ${riceType} (${priceType})`;
          const color = Highcharts.color(baseColor)
            .brighten(priceIdx * -0.2)
            .get();
          const dashStyle = ["Solid", "Dash", "Dot"][priceIdx % 3];

          const dataPath =
            fakeData[filterOptions.timePeriod]?.[category]?.[riceType]?.[
              priceType
            ];

          const sliceIndices =
            filterOptions.timePeriod === "Yearly"
              ? [startYearIndex, endYearIndex]
              : filterOptions.timePeriod === "Monthly"
              ? [startMonthIndex, endMonthIndex]
              : null;

          const data = sliceIndices
            ? dataPath?.slice(...sliceIndices)
            : dataPath || [];

          return { name, color, dashStyle, data };
        });
      })
    );

    // Calculate yAxis min/max
    const allValues = series.flatMap((s) => s.data).filter(Number.isFinite);
    const min = allValues.length ? Math.floor(Math.min(...allValues)) : 0;
    const max = allValues.length ? Math.ceil(Math.max(...allValues)) : 100;

    setChartOptions({
      chart: { type: "line", height: "100%" },
      title: { text: " " },
      xAxis: {
        categories:
          filterOptions.timePeriod === "Yearly"
            ? updatedYearRange
            : filterOptions.timePeriod === "Monthly"
            ? updatedMonthRage.map((item) => `${item.month} ${item.year}`)
            : timePeriod[filterOptions.timePeriod],
        title: { text: `Time period (${filterOptions.timePeriod})` },
        labels: { rotation: -45, step: 1 },
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
      accessibility: {
        enabled: false,
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
    setChartKey((prev) => prev + 1);
  }, [filterOptions, monthRange, yearRange]);

  return (
    <section>
      <h4 className="roboto-medium home-section-headers">
        Price Trends at a Glance
        <div className="filter-container">
          <div
            className={isOpen ? "filter active" : "filter"}
            onClick={() => setIsOpen(!isOpen)}
          >
            Filter <Icon icon="cil:filter" width={15} />
          </div>

          {isOpen && (
            <FilterPopup
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              filters={filterOptions}
              yearRange={yearRange}
              monthRange={monthRange}
              setYearRange={setYearRange}
              setMonthRange={setMonthRange}
              setFilterOptions={setFilterOptions}
            />
          )}
        </div>
      </h4>

      <div
        style={{
          marginTop: "20px",
          maxWidth: "39vw",
          overflow: "scroll",
        }}
      >
        <HighchartsReact
          key={chartKey}
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </section>
  );
}
