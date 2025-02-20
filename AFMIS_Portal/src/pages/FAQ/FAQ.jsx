import SectionTitle from "../../components/SectionTitle";
import FAQCard from "./FaqCard";
import "./FAQ.css";
import { faqDetails } from "../../Data/FaqDetails";

export default function Faq() {
  return (
    <main>
      <SectionTitle title="Frequently Asked Questions (FAQ)" />
      <section className="faq-container">
        {faqDetails.map((entry) => {
          return (
            <FAQCard
              key={entry.question}
              question={entry.question}
              answer={entry.answer}
            />
          );
        })}
      </section>
    </main>
  );
}
