import { priceTypes, riceCommodity, timePeriod } from "./Data/HomeData";
import { FilterYearRange, FilterMonthRange } from "./FilterRange";

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

  const handleYearRangeChange = (e, type) => {
    const value = parseInt(e.target.value);
    setYearRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

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

  return (
    <div className="filter-overlay" onClick={(e) => e.stopPropagation()}>
      <fieldset>
        <legend>Time Period</legend>
        <div className="filter-options">
          {Object.keys(timePeriod).map((key) => (
            <div key={key}>
              <label className="roboto-regular">
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
