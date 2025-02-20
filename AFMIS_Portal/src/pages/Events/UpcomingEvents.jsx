import SectionTitle from "../../components/SectionTitle";
import UpcomingEventsCard from "./UpcomingEventsCard";
import { eventDetails } from "../../data/EventDetails";

export default function UpcomingEvents() {
  return (
    <main>
      <SectionTitle title={"Upcoming Events"} />
      <div
        className={`events-cards-container ${
          eventDetails.length % 3 != 0 ? "event-fill-container" : ""
        }`}
      >
        {eventDetails.map((event) => {
          return (
            <UpcomingEventsCard
              key={event.imgSrc}
              title={event.title}
              author={event.author}
              date={event.date}
              imgSrc={event.imgSrc}
            />
          );
        })}
      </div>
    </main>
  );
}
