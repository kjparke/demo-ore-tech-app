import { EventReportPayload } from "../../../interfaces/Event";

interface EventDropdownProps {
  events: EventReportPayload[];
  selectedEventId: string;
  onSelectEvent: (eventId: string) => void;
}

export default function EventDropdown({
  events,
  selectedEventId,
  onSelectEvent,
}: EventDropdownProps) {
  return (
    <select
      className="form-select"
      value={selectedEventId}
      onChange={(e) => onSelectEvent(e.target.value)}
    >
      <option value="" disabled>
        Select an Event
      </option>
      {events.map((event) => (
        <option key={event._id} value={event._id}>
          {`${event.unitId} (${event.location}) | ${event.status} | ${event.secondaryStatus} `}
        </option>
      ))}
    </select>
  );
}