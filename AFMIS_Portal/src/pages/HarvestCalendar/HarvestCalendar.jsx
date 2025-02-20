import { Calendar, globalizeLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./HarvestCalendar.css";
import globalize from "globalize";

const localizer = globalizeLocalizer(globalize);

const events = [
  //NOTE: Month - 0 to 11 (January to December)
  //DAY: Ends -1 day (12 means 11 at the calendar)
  {
    id: 1,
    title: "Cabbage Harvest",
    start: new Date(2025, 1, 6),
    end: new Date(2025, 1, 12),
    allDay: true,
    description: "Cabbage",
    resourceId: 1,
    backgroundColor: "#008000",
    color: "#fff",
  },
  {
    id: 2,
    title: "Carrot Harvest",
    start: new Date(2025, 1, 9),
    end: new Date(2025, 1, 29),
    allDay: true,
    description: "Carrot",
    resourceId: 1,
    backgroundColor: "#e9692c",
  },
  {
    id: 3,
    title: "Onion Harvest",
    start: new Date(2025, 1, 22),
    end: new Date(2025, 2, 10),
    allDay: true,
    description: "Onion",
    resourceId: 1,
    backgroundColor: "#62121b",
    color: "white",
  },
];

export default function HarvestCalendar() {
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.backgroundColor || "gray",
        color: event.color || "black",
        padding: "5px",
        opacity: "0.85",
        borderRadius: "2px",
      },
    };
  };

  return (
    <div className="lato-regular harvest-calendar">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "60vh", width: "50vw" }}
        views={["month", "agenda"]}
        events={events}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
