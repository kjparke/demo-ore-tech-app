import { useState } from "react";
import { EventReportPayload } from "../../../interfaces/Event";
import WorkToBeCompletedTableHeader from "./WorkToBeCompletedTableHeader";
import moment from "moment";

interface WorkToBeCompletedTableProps {
  events: EventReportPayload[];
  onRemoveEvents?: (id: string) => void; 
  isEditable?: boolean; 
  onUpdateNotes?: (id: string, notes: string) => void; 
}

export default function WorkToBeCompletedTable({
  events,
  isEditable = false,
  onRemoveEvents,
  onUpdateNotes,
}: WorkToBeCompletedTableProps) {
  const [notesState, setNotesState] = useState<{ [key: string]: string }>(
    events.reduce((acc, event) => ({ ...acc, [event._id]: event.notes || "" }), {})
  );

  const handleNotesChange = (id: string, value: string) => {
    setNotesState((prev) => ({ ...prev, [id]: value }));
    if (onUpdateNotes) {
      onUpdateNotes(id, value);
    }
  };

  return (
    <table className="table table-striped table-bordered table-hover">
        <WorkToBeCompletedTableHeader />
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.unitId} ({event.location})</td>
                <td>{event.secondaryStatus}</td>
                <td>
                  {event.scheduleOutDate
                    ? moment(event.scheduleOutDate).format("YYYY-MM-DD")
                    : "N/A"}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      className="form-control"
                      value={notesState[event._id] || ""}
                      onChange={(e) => handleNotesChange(event._id, e.target.value)}
                      placeholder="Add notes here..."
                    />
                  ) : (
                    event.notes || "N/A"
                  )}
                </td>
                <td>
                  {isEditable && onRemoveEvents && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemoveEvents(event._id)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No events.
              </td>
            </tr>
          )}
        </tbody>
    </table>
  );
}