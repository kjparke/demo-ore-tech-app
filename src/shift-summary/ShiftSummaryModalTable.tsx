import { SetStateAction } from "react";
import {
  DOWN_STATUSES,
} from "../constants/GeneralConstants";
import { EventDelta, ModifiedEventDelta } from "./EventChartInterfaces";
import { useAppContext } from "../context/AppContext";

interface ShiftSummaryModalTableProps {
	originalDeltas: EventDelta[];
	modifiedDeltas: EventDelta[];
	setModifiedDeltas: React.Dispatch<SetStateAction<EventDelta[]>>
}

export default function ShiftSummaryModalTable({
	originalDeltas, 
	modifiedDeltas, 
	setModifiedDeltas,
}: ShiftSummaryModalTableProps) {
	const handleChange = (
    hour: number,
    field: keyof EventDelta,
    value: string
  ) => {
    setModifiedDeltas((prev) => {
      const updatedDeltas = [...prev];
      const existingIndex = updatedDeltas.findIndex(
        (delta) => parseInt(delta.startTime.split(":")[0], 10) === hour
      );

      const existingDelta = originalDeltas.find((delta) => {
        const eventStartHour = parseInt(delta.startTime.split(":")[0], 10);
        const eventEndHour = parseInt(delta.endTime.split(":")[0], 10);
        return eventStartHour <= hour && eventEndHour > hour;
      });

      const currentDelta =
        existingIndex !== -1 ? updatedDeltas[existingIndex] : existingDelta;

      const newDelta: ModifiedEventDelta = {
        id: "",
        associatedDelta: existingDelta && existingDelta.id ? existingDelta.id : "",
        eventId: 
          field === "eventId" ? value : currentDelta ? currentDelta.eventId : "",
        status:
          field === "status" ? value : currentDelta ? currentDelta.status : "",
        secondaryStatus:
          field === "secondaryStatus"
            ? value
            : currentDelta
            ? currentDelta.secondaryStatus
            : "",
        startTime: `${hour.toString().padStart(2, "0")}:00`,
        endTime: `${(hour + 1).toString().padStart(2, "0")}:00`,
      };

      if (existingIndex !== -1) {
        updatedDeltas[existingIndex] = newDelta;
      } else {
        updatedDeltas.push(newDelta);
      }

      return updatedDeltas;
    });
  };

  const { secondaryStatuses } = useAppContext();

  const getCurrentValue = (hour: number, field: keyof EventDelta): string => {
    const delta =
      modifiedDeltas.find((event) => {
        const eventStartHour = parseInt(event.startTime.split(":")[0], 10);
        const eventEndHour = parseInt(event.endTime.split(":")[0], 10);
        return eventStartHour <= hour && eventEndHour > hour;
      }) ||
      originalDeltas.find((event) => {
        const eventStartHour = parseInt(event.startTime.split(":")[0], 10);
        const eventEndHour = parseInt(event.endTime.split(":")[0], 10);
        return eventStartHour <= hour && eventEndHour > hour;
      });

    return delta ? (delta[field] as string) : "";
  };

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Time</th>
          <th>Status</th>
          <th>Secondary Status</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 24 }, (_, hour) => {
          const status = getCurrentValue(hour, "status");
          const secondaryStatus = getCurrentValue(hour, "secondaryStatus");

          const hasDelta = status || secondaryStatus;

          return (
            <tr key={hour}>
              <td>{`${hour}:00`}</td>
              {hasDelta ? (
                <>
                  <td>
                    <div className="col">
                      <select
                        id={`status-${hour}`}
                        className="form-control"
                        value={status}
                        onChange={(e) =>
                          handleChange(hour, "status", e.target.value)
                        }
                      >
                        <option value={DOWN_STATUSES.SCHEDULED}>
                          Down Scheduled
                        </option>
                        <option value={DOWN_STATUSES.UNSCHEDULED}>
                          Down Unscheduled
                        </option>
                        <option value={DOWN_STATUSES.WAITING}>
                          Down Waiting
                        </option>
                        <option value={DOWN_STATUSES.PENDING}>
                         Pending 
                        </option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <select
                      id={`secondaryStatus-${hour}`}
                      className="form-control"
                      value={secondaryStatus}
                      onChange={(e) =>
                        handleChange(hour, "secondaryStatus", e.target.value)
                      }
                    >
                      <option value="">Select a status</option>
                      {secondaryStatuses.map((sec_status) => (
                        <option key={sec_status} value={sec_status}>
                          {sec_status}
                        </option>
                      ))}
                    </select>
                  </td>
                </>
              ) : (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
