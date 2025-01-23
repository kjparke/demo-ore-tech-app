import { useState, useEffect } from "react";
import {
  AssetShiftData,
  EventDelta,
} from "./EventChartInterfaces";
import API from "../Api";
import { useAuth } from "../auth/AuthContext";
import ShiftSummaryModalTable from "./ShiftSummaryModalTable";

interface ShiftSummaryModalProps {
  modalId: string;
  date: string;
  assetData: AssetShiftData;
  refreshData: () => void;
}

export default function ShiftSummaryModal(props: ShiftSummaryModalProps) {
  const { assetData } = props;
  const { user } = useAuth();
  const [modifiedDeltas, setModifiedDeltas] = useState<EventDelta[]>([]);
  const [originalDeltas, setOriginalDeltas] = useState<EventDelta[]>([]);

  // Update state when props change
  useEffect(() => {
    setOriginalDeltas([...assetData.events]);
    setModifiedDeltas([]);
  }, [assetData, props.date]);

  const saveChanges = async () => {
    const payload = {
      data: {
        originalDeltas: originalDeltas,
        modifiedDeltas: modifiedDeltas,
        date: props.date,
      },
      metaData: user,
    };

    console.log({ payload: payload });

    try {
      const resp = await API.patch("/eventDelta/update-deltas", payload);
      if (resp.status === 200) {
        props.refreshData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id={props.modalId} className="modal fade" tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold ps-3">{assetData.unitId}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <ShiftSummaryModalTable
              originalDeltas={originalDeltas}
              modifiedDeltas={modifiedDeltas}
              setModifiedDeltas={setModifiedDeltas}
            />
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-inverse"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveChanges}
              disabled={modifiedDeltas.length === 0}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
