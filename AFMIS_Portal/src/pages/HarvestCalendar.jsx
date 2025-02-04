import { Calendar, globalizeLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from "globalize";

const localizer = globalizeLocalizer(globalize);

export default function HarvestCalendar() {
  return (
    <div className="roboto-regular">
      <Calendar
        localizer={localizer}
        defaultView={Views.MONTH}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

//TODO
// harvest calendar
// commodity flow
// agribussiness players - filter
