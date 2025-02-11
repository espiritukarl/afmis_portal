import { priceTypes, riceCommodity, timePeriod } from "./Data/HomeData";
import { FilterRange } from "./FilterRange";

export default function FilterPopup({
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
