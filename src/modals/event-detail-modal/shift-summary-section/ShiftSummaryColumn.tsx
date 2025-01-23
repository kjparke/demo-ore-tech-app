import "../../modal.css";
import { useCallback, useEffect, useState } from "react";
import { useEventDetailModalContext } from "../EventDetailContext";
import ShiftSummaryModalTable from "../../../shift-summary/ShiftSummaryModalTable";
import { EventDelta } from "../../../shift-summary/EventChartInterfaces";
import DatePicker from "../../../shift-summary/DatePicker";
import moment from "moment";
import { useAuth } from "../../../auth/AuthContext";
import API from "../../../Api";

export default function ShiftSummaryColumn() {
  const [originalDeltas, setOriginalDeltas] = useState<EventDelta[]>([]);
  const [modifiedDeltas, setModifiedDeltas] = useState<EventDelta[]>([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const { asset } = useEventDetailModalContext();
  const { user } = useAuth();

  const fetchShiftSummary = useCallback(async () => {
    try {
      if (asset.activeEvent._id !== "") {
        const response = await API.get(`/eventDelta/?date=${date}&eventId=${asset.activeEvent._id}`);
        setOriginalDeltas(response.data.events);
      }
    } catch (error) {
      console.error("Failed to fetch shift summary:", error);
      return [];
    }
  }, [date, asset.activeEvent._id]);

  const saveChanges = async () => {
    const payload = {
      data: {
        originalDeltas: originalDeltas,
        modifiedDeltas: modifiedDeltas,
        date: date,
      },
      metaData: user,
    };

    try {
      const resp = await API.patch("/eventDelta/update-deltas", payload);
      if (resp.status === 200) {
        alert("Event summary successfully updated.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShiftSummary();
  }, [fetchShiftSummary]);

  return (
    <div className="event-shift-summary">
      <div className="mb-2">
        <DatePicker
          date={date}
          setDate={setDate}
          min={asset.activeEvent.downDate}
        />
      </div>
      <div className="shift-summary-table-container mb-2">
        <ShiftSummaryModalTable
          originalDeltas={originalDeltas}
          modifiedDeltas={modifiedDeltas}
          setModifiedDeltas={setModifiedDeltas}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary mb-2"
          data-bs-dismiss="modal"
          onClick={saveChanges}
        >
          Save Shift Changes
        </button>
      </div>
    </div>
  );
}
