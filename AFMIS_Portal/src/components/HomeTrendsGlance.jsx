import { useState } from "react";

export default function PriceTrendsGlance({ priceTrends }) {
  const [chosenPriceTrend, setChosenPriceTrend] = useState("rice");

  function isChosen(category) {
    return chosenPriceTrend === category.toLowerCase();
  }

  return (
    <section>
      <h4 className="roboto-medium home-section-headers">
        Price Trends at a Glance
      </h4>
      <div className="selection-bar-container roboto-regular">
        {priceTrends.map((category) => (
          <div
            key={category.toLowerCase()}
            className={`selection-bar-choice ${
              isChosen(category) ? "selection-bar-chosen" : ""
            }`}
            onClick={() => setChosenPriceTrend(category.toLowerCase())}
          >
            {category}
          </div>
        ))}
      </div>
      {priceTrends.map((category) => {
        if (isChosen(category)) {
          return <div key={`${category}ischosen`}>{category}</div>;
        }
      })}
    </section>
  );
}
