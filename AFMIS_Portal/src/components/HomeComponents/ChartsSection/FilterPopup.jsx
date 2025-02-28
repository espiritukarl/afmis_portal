import { priceTypes, riceCommodity, timePeriod } from "../../../data/HomeData";
import { FilterYearRange, FilterMonthRange } from "./FilterRange";

// This is the section that opens upon clicking Filter button. It filters the Highcharts data, based on its entries
export default function FilterPopup({
  filters,
  isOpen,
  yearRange,
  monthRange,
  setYearRange,
  setMonthRange,
  setFilterOptions,
}) {
  if (!isOpen) return null;

  // Sets a range for the months: Format is Start: MM/YYYY - End: MM/YYYY
  const handleMonthRangeChange = (e, type, time) => {
    const value = parseInt(e.target.value);
    setMonthRange((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [time]: value,
      },
    }));
  };

  // Sets a range for the years: Format is Start: YYYY - End: YYYY
  const handleYearRangeChange = (e, type) => {
    const value = parseInt(e.target.value);
    setYearRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Handles the change of Radio buttons (specifically for the TIME PERIOD types e.g. Yearly, Monthly, Weekly, Daily)
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  // Handles the change of Checkboxes (specifically for the RICE COMMODITIES and its corresponding subcategories e.g. rice-for-all, imported commercial rice, local commericial rice)
  // Note: each rice type will show data for each price type
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

  // Handles the change of Checkboxes (specifically for the PRICE TYPE e.g. prevailing, low, high, average, median)
  const handlePriceTypeCheckbox = (e) => {
    const { value, checked } = e.target;
    setFilterOptions((prev) => ({
      ...prev,
      priceTypes: checked
        ? [...prev.priceTypes, value]
        : prev.priceTypes.filter((type) => type !== value),
    }));
  };

  return (
    <div className="filter-overlay" onClick={(e) => e.stopPropagation()}>
      <fieldset>
        <legend>Time Period</legend>
        <div className="filter-options">
          {Object.keys(timePeriod).map((key) => (
            <div key={key}>
              <label className="roboto-regular time-period-options">
                <input
                  type="radio"
                  name="timePeriod"
                  value={key}
                  checked={filters.timePeriod === key}
                  onChange={handleRadioChange}
                />
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </label>
              {filters.timePeriod === "Yearly" && key === "Yearly" && (
                <FilterYearRange
                  yearRange={yearRange}
                  handleYearRangeChange={handleYearRangeChange}
                />
              )}
              {filters.timePeriod === "Monthly" && key === "Monthly" && (
                <FilterMonthRange
                  monthRange={monthRange}
                  handleMonthRangeChange={handleMonthRangeChange}
                />
              )}
            </div>
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
