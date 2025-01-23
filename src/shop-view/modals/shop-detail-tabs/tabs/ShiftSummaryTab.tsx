import { useEffect } from "react";
import shiftServiceInstance from "../../../../services/shift.service";
import {
  DOWN_STATUSES,
  MAINTENANCE_STATUSES,
} from "../../../../constants/GeneralConstants";
import { formatDate } from "../../../../helpers/AssetHelpers";
import { DateFormat } from "../../../../constants/GeneralConstants";
import { EventDelta } from "../../../../interfaces/Log";
import { useModal } from "../../../../context/ShopDetailModalContext";
import AddEventDelta from "../AddEventDelta";

export default function ShiftSummaryTab() {
  const { assetDetail, shiftSummary, setShiftSummary, fetchShiftSummary } =
    useModal();

  const handleStatusChange = async (
    newStatus: string,
    delta: EventDelta,
    index: number
  ) => {
    const updatedLogs = [...shiftSummary];
    updatedLogs[index].log.status = newStatus;
    setShiftSummary(updatedLogs);

    try {
      await shiftServiceInstance.updateShiftSummary(delta._id, {
        ...delta,
        status: newStatus,
      });
    } catch (error) {
      const revertedLogs = [...shiftSummary];
      revertedLogs[index].log.status = delta.status;
      setShiftSummary(revertedLogs);
    }
  };

  const handleSecondaryStatusChange = async (
    newSecondaryStatus: string,
    update: EventDelta,
    index: number
  ) => {
    const updatedLogs = [...shiftSummary];
    updatedLogs[index].log.secondaryStatus = newSecondaryStatus;
    setShiftSummary(updatedLogs);

    try {
      await shiftServiceInstance.updateShiftSummary(update._id, {
        ...update,
        secondaryStatus: newSecondaryStatus,
      });
    } catch (error) {
      const revertedLogs = [...shiftSummary];
      revertedLogs[index].log.secondaryStatus = update.secondaryStatus;
      setShiftSummary(revertedLogs);
    }
  };

  useEffect(() => {
    fetchShiftSummary();
  }, [fetchShiftSummary]);

  return (
    <div className="row justify-content-center pt-3">
      <div className="mt-3">
        {/* <AddEventDelta eventId={assetDetail.eventId}/> */}
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
            {shiftSummary.map((delta, index) => (
              <tr key={index + "-" + index}>
                <td>
                  {formatDate(delta.hour, DateFormat.MONTH_DAY_YEAR_HOUR)}
                </td>
                <td>
                  <div className="col">
                    <select
                      id="status"
                      className="form-control"
                      value={delta.log.status}
                      onChange={(e) => {
                        handleStatusChange(e.target.value, delta.log, index);
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
                    value={delta.log.secondaryStatus}
                    onChange={(e) => {
                      handleSecondaryStatusChange(
                        e.target.value,
                        delta.log,
                        index
                      );
                    }}
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
                    delta.log.createdAt,
                    DateFormat.MONTH_DAY_YEAR_HOUR
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
