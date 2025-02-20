import { useState } from "react";
import { Icon } from "@iconify/react";

export default function FAQCard({ question, answer }) {
  const [openFaq, setOpenFaq] = useState(false);
  const arrowDown = "solar:round-arrow-down-linear";
  const arrowUp = "solar:round-arrow-up-linear";

  return (
    <div className="faq-card" onClick={() => setOpenFaq((prev) => !prev)}>
      <div className="faq-text-container">
        <h4 className="faq-header">{question}</h4>
        {openFaq && <div className="faq-answer">{answer}</div>}
      </div>
      <Icon
        icon={openFaq ? arrowUp : arrowDown}
        width={100}
        height={45}
        className="faq-icon"
      />
    </div>
  );
}
