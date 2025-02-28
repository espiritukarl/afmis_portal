import { timePeriod } from "../../../data/HomeData";
//This whole file handles the ranges for the Filter - for now, Yearly and Monthly have been implemented

export function FilterYearRange({ yearRange, handleYearRangeChange }) {
  return (
    <div className="year-range" style={{ marginTop: "10px" }}>
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

export function FilterMonthRange({ monthRange, handleMonthRangeChange }) {
  return (
    <>
      <div className="range" style={{ marginTop: "10px" }}>
        <label className="range-label">Start:</label>
        <div className="monthly">
          <select
            onChange={(e) => handleMonthRangeChange(e, "start", "month")}
            value={monthRange.start.month}
            className="roboto-regular"
          >
            {timePeriod["Monthly"].map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={monthRange.start.year}
            onChange={(e) => handleMonthRangeChange(e, "start", "year")}
            min={timePeriod["Yearly"][0]}
            max={timePeriod["Yearly"][timePeriod["Yearly"].length - 1]}
            className="roboto-regular"
          />
        </div>
      </div>
      <div className="range">
        <label className="range-label">End:</label>
        <div className="monthly">
          <select
            onChange={(e) => handleMonthRangeChange(e, "end", "month")}
            value={monthRange.end.month}
            className="roboto-regular"
          >
            {timePeriod["Monthly"].map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={monthRange.end.year}
            onChange={(e) => handleMonthRangeChange(e, "end", "year")}
            min={timePeriod["Yearly"][0]}
            max={timePeriod["Yearly"][timePeriod["Yearly"].length - 1]}
            className="roboto-regular"
          />
        </div>
      </div>
    </>
  );
}
