import SectionTitle from "../components/SectionTitle";
import FaqCard from "../components/FaqCard";
import "../styles/faq.css";
import { faqDetails } from "../Data/FaqDetails";

export default function Faq() {
  return (
    <main>
      <SectionTitle title="Frequently Asked Questions (FAQ)" />
      <section className="faq-container">
        {faqDetails.map((entry) => {
          return (
            <FaqCard
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
