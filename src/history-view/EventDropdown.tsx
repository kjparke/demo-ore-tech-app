import { Event } from "../interfaces/Event";
import { formatDate } from "../helpers/AssetHelpers";
import { DateFormat } from "../constants/GeneralConstants";

interface EventDropdownProps {
  events: Event[];
  setCurrentEvent: React.Dispatch<React.SetStateAction<Event>>;
}

export default function EventDropdown(props: EventDropdownProps) {
  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventId = event.target.value;
    const selectedEvent = props.events.find((e) => e._id === selectedEventId);
    if (selectedEvent) {
      props.setCurrentEvent(selectedEvent);
    }
  };

  return (
    <>
      <div className="d-flex py-2">Current Event</div>
      <div>
        <select onChange={handleEventChange}>
          {props.events.map((event) => {
            return (
              <option key={event._id} value={event._id}>
                Event ID - {event._id} |{" "}
                {event.workOrderNumber
                  ? event.workOrderNumber
                  : "No Work Order Number"}{" "}
                | Start: {formatDate(event.downDate, DateFormat.YEAR_MONTH_DAY)}{" "}
                - End: {event.actualOutDate ? event.actualOutDate : "N/A"}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
