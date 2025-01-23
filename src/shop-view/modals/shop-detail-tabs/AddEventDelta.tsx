import { useState } from "react";
import {
  DOWN_STATUSES,
  MAINTENANCE_STATUSES,
} from "../../../constants/GeneralConstants";
import { useModal } from "../../../context/ShopDetailModalContext";
import shiftServiceInstance from "../../../services/shift.service";

interface AddEventDeltaProps {
  eventId: string;
}

export interface EventDeltaPayload {
	eventId: string;
  date: string;
  hour: string;
  status: string;
  secondaryStatus: string;
}

export default function AddEventDelta(props: AddEventDeltaProps) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [status, setStatus] = useState<string>(DOWN_STATUSES.SCHEDULED);
  const [secondaryStatus, setSecondaryStatus] = useState("");
  const { fetchShiftSummary } = useModal();

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hourString = `${(i + 1).toString().padStart(2, "0")}00 HRS`;
    return (
      <option key={i + 1} value={i + 1}>
        {hourString}
      </option>
    );
  });

  const handleAddShiftRecord = async () => {
    const newEventDelta = {
			eventId: props.eventId,
      date: date,
      hour: hour,
      status: status,
      secondaryStatus: secondaryStatus,
    };
		try {
			await shiftServiceInstance.createEventDelta(
				newEventDelta
			)
			setDate("");
			setHour("");
			setStatus("");
			setSecondaryStatus("");
	
			fetchShiftSummary();
		} catch (error) {
			console.error(error);
		}
  };

  return (
    <div className="px-3">
      <div className="card">
        <h5 className="card-title">Add Shift Summary Record</h5>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col">
              <div>
                <select
                  id="hourDropdown"
                  className="form-control"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                >
                  <option value="">Select An Hour</option>
                  {hourOptions}
                </select>
              </div>
            </div>
            <div className="col">
              <select
                id="statusDropdown"
                className="form-control"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value={DOWN_STATUSES.SCHEDULED}>Down scheduled</option>
                <option value={DOWN_STATUSES.UNSCHEDULED}>
                  Down Unscheduled
                </option>
                <option value={DOWN_STATUSES.WAITING}>Down Waiting</option>
              </select>
            </div>
            <div className="col">
              <select
                id="secondaryStatus"
                className="form-control"
                value={secondaryStatus}
                onChange={(e) => {
                  setSecondaryStatus(e.target.value);
                }}
              >
                {MAINTENANCE_STATUSES.map((sec_status) => (
                  <option key={sec_status} value={sec_status}>
                    {sec_status}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-primary"
                onClick={handleAddShiftRecord}
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
