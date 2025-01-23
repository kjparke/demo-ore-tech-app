import React, { useEffect, useState } from "react";
import shiftServiceInstance from "../services/shift.service";
import { HourlyChange } from "../interfaces/Log";
import { formatDate, formatStatusString } from "../helpers/AssetHelpers";
import { DOWN_STATUSES, DateFormat } from "../constants/GeneralConstants";

interface StatusHistoryProps {
  eventId: string;
}

export default function StatusHistory(props: StatusHistoryProps) {
  const [hourlyLogs, setHourlyLog] = useState([]);

  useEffect(() => {
    const fetchShiftSummary = async () => {
      try {
        const response = await shiftServiceInstance.getShiftSummary(
          props.eventId
        );
        setHourlyLog(response.data);
      } catch (error) {
        console.error("Failed to fetch shift summary:", error);
        return [];
      }
    };

    fetchShiftSummary();
  }, [props.eventId]);
  return (
    <div className="history-table-container mt-2">
      <div>
        {hourlyLogs.length > 0 ? (
          <table className="table table-striped table-bordered table-hover">
            <thead className="sticky-header">
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {hourlyLogs.map((hourlyLog: HourlyChange) => {
                return (
                  <tr key={hourlyLog.hour}>
                    <td>
                    {Object.values(DOWN_STATUSES).includes(hourlyLog.log.status as DOWN_STATUSES)
                      ? formatStatusString(hourlyLog.log.status)
                      : hourlyLog.log.status} - {hourlyLog.log.secondaryStatus}
                  </td>
                    <td>
                      {formatDate(
                        hourlyLog.hour,
                        DateFormat.MONTH_DAY_YEAR_HOUR
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="d-flex p-2">
            <p className="text-muted">Status history not available for this event.</p>
          </div>
        )}
      </div>
    </div>
  );
}
