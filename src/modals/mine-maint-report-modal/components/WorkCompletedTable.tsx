import moment from "moment";
import { EventReportPayload } from "../../../interfaces/Event";
import WorkCompletedTableHeader from "./WorkCompletedTableHeader";

interface WorkCompletedTableProps {
  events: EventReportPayload[];
  onRemoveEvents?: (id: string) => void; 
  isEditable?: boolean; 
}

export default function WorkCompletedTable({
  events,
  onRemoveEvents,
}: WorkCompletedTableProps) {

  return (
      <table className="table table-striped table-bordered table-hover">
        <WorkCompletedTableHeader />
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.unitId} ({event.location})</td>
                <td>{event.secondaryStatus}</td>
                <td>
                  {event.actualOutDate
                    ? moment(event.actualOutDate).format("YYYY-MM-DD")
                    : "N/A"}
                </td>
                <td>{event.notes || "N/A"}</td>
                <td>
                  {onRemoveEvents && (
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