import { SetStateAction } from "react";
import TruckDetailForm from "./TruckDetailForm";
import TruckCalibrationChecklist from "./TruckCalibrationChecklist";
import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import UserActivityDetails from "./UserActivityDetails";

interface AHSCalibrationCardContentProps {
  ahsRecord: AHSCalibrationRecord;
  setAHSCalibrationRecord: React.Dispatch<SetStateAction<AHSCalibrationRecord>>;
  isForm?: boolean;
}

export default function AHSCalibrationCardContent(
  props: AHSCalibrationCardContentProps
) {
  const editableTextArea = (
    <>
      <div className="w-100">
        <textarea
          className="form-control"
          placeholder="Notes"
          id="textarea"
          value={props.ahsRecord.notes}
          onChange={(e) => {
            props.setAHSCalibrationRecord({
              ...props.ahsRecord,
              notes: e.target.value,
            });
          }}
        ></textarea>
      </div>
    </>
  );

  const notes = (
    <>
      {props.ahsRecord.notes ? (
        <p className="read-only-notes">{props.ahsRecord.notes}</p>
      ) : (
        <div>
          <small className="text-muted">Click 'Edit' to record your note.</small>
        </div>
      )}
    </>
  );

  return (
    <>
      <TruckDetailForm
        ahsRecord={props.ahsRecord}
        setAHSCalibrationRecord={props.setAHSCalibrationRecord}
        isForm={props.isForm}
      />
      <TruckCalibrationChecklist
        ahsRecord={props.ahsRecord}
        setAHSCalibrationRecord={props.setAHSCalibrationRecord}
        isForm={props.isForm}
      />
      <hr></hr>
      <h6 className="mt-2">Notes</h6>
      <div className="row mt-2">{props.isForm ? editableTextArea : notes}</div>

      {!props.isForm && (
        <>
        <hr></hr>
        <UserActivityDetails
          createdBy={props.ahsRecord.createdBy}
          lastUpdatedBy={props.ahsRecord.lastUpdatedBy}
          completedBy={props.ahsRecord.completedBy}
          createdAt={props.ahsRecord.createdAt}
          updatedAt={props.ahsRecord.updatedAt}
          completedAt={props.ahsRecord.completedAt}
        />
        </>
      )}
    </>
  );
}
