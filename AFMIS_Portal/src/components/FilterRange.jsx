import { timePeriod } from "./Data/HomeData";

export function FilterRange({ yearRange, handleYearRangeChange }) {
  return (
    <div className="year-range">
      <div className="range">
        <label>
          <span className="range-label">Start Year:</span>
          <input
            type="number"
            value={yearRange.start}
            onChange={(e) => handleYearRangeChange(e, "start")}
            min={timePeriod["Yearly"][0]}
            max={timePeriod["Yearly"][timePeriod["Yearly"].length - 1]}
            className="roboto-regular"
          />
        </label>
      </div>
      <div className="range">
        <label>
          <span className="range-label">End Year:</span>
          <input
            type="number"
            value={yearRange.end}
            onChange={(e) => handleYearRangeChange(e, "end")}
            min={timePeriod["Yearly"][0]}
            max={timePeriod["Yearly"][timePeriod["Yearly"].length - 1]}
            className="roboto-regular"
          />
        </label>
      </div>
    </div>
  );
}
