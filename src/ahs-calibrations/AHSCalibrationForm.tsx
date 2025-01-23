import './card.css';
import { SetStateAction, useState } from "react";
import { AHSCalibrationRecord, defaultAHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import AHSCalibrationCardContent from "./AHSCalibrationCardContent";
import { useAuth } from '../auth/AuthContext';
import API from '../Api';

interface AHSCalibrationCardProps {
  setAHSCalibrationRecords: React.Dispatch<SetStateAction<AHSCalibrationRecord[]>>;
  isForm?: boolean;
}

export default function AHSCalibrationForm(props: AHSCalibrationCardProps) {
  const [ahsRecord, setAHSRecord] = useState(defaultAHSCalibrationRecord);
  const { user } = useAuth();

  const handleReset = () => {
    setAHSRecord(defaultAHSCalibrationRecord);
  };

  const handleSave = async () => {
    const newAHSRecord = {...ahsRecord, createdBy: user?.id, lastUpdatedBy: user?.id};
    const payload = {
      data: newAHSRecord,
      metaData: user,
    }
    try {
      const response = await API.post("/ahsCalibrations/", payload);
      props.setAHSCalibrationRecords(prev => [...prev, response.data]);
      setAHSRecord(defaultAHSCalibrationRecord);

    } catch(error) {
      console.log({Error: error});
    }
  }

  const isFormInvalid = ahsRecord.unitId.length <= 0;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5>New AHS Calibration Record</h5>

        <AHSCalibrationCardContent
          ahsRecord={ahsRecord}
          setAHSCalibrationRecord={setAHSRecord}
          isForm
        />

      </div>
      {props.isForm && (
        <div className="row">
          <div className="col d-flex justify-content-md-end">
            <button className="btn btn-inverse me-2" onClick={ handleReset }>Clear Form</button>
            <button className="btn btn-primary" onClick={ handleSave } disabled={isFormInvalid}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
