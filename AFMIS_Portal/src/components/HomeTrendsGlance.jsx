import { useState } from "react";

export default function PriceTrendsGlance({ priceTrends }) {
  const [chosenPriceTrend, setChosenPriceTrend] = useState("rice");

  function isChosen(category) {
    if (chosenPriceTrend === category.toLowerCase())
      return "selection-bar-chosen";
    return null;
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
            className={`selection-bar-choice ${isChosen(category)}`}
            onClick={() => setChosenPriceTrend(category.toLowerCase())}
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}
