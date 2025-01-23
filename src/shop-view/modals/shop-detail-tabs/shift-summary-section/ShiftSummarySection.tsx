import { DateFormat } from "../../../../constants/GeneralConstants";
import { formatDate } from "../../../../helpers/AssetHelpers";
import { EventDelta, HourlyChange } from "../../../../interfaces/Log";
import {
  DOWN_STATUSES,
  MAINTENANCE_STATUSES,
} from "../../../../constants/GeneralConstants";
import AddEventDelta from "../AddEventDelta";

interface ShiftSummaryProps {
  hourlyChangeLogs: HourlyChange[];
}

export default function ShiftSummarySection(props: ShiftSummaryProps) {
  const handleStatusChange = (
    eventDeltaId: string,
    statusChange: string,
    update: EventDelta
  ) => {};

  return (
    <div className="mt-3">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Hour</th>
            <th>Status</th>
            <th>Secondary Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {props.hourlyChangeLogs.map((change, index) => (
            <tr key={index + "-" + index}>
              <td>{formatDate(change.hour, DateFormat.MONTH_DAY_YEAR_HOUR)}</td>
              <td>
                <div className="col">
                  <select
                    id="status"
                    className="form-control"
                    value={change.log.status}
                    onChange={(e) => {
                      handleStatusChange(
                        change.log._id,
                        e.target.value,
                        change.log
                      );
                    }}
                  >
                    <option value={DOWN_STATUSES.SCHEDULED}>
                      {" "}
                      Down Scheduled{" "}
                    </option>
                    <option value={DOWN_STATUSES.UNSCHEDULED}>
                      {" "}
                      Down Unscheduled{" "}
                    </option>
                    <option value={DOWN_STATUSES.WAITING}>
                      {" "}
                      Down Waiting{" "}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <select
                  id="secondaryStatus"
                  className="form-control"
                  value={change.log.secondaryStatus}
                  onChange={(e) => handleStatusChange}
                >
                  <option value="">Select a status</option>
                  {MAINTENANCE_STATUSES.map((sec_status) => (
                    <option key={sec_status} value={sec_status}>
                      {sec_status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {formatDate(
                  change.log.createdAt,
                  DateFormat.MONTH_DAY_YEAR_HOUR
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
