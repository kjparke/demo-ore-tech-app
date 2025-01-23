import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import AHSCalibrationCard from "./AHSCalibrationCard";

interface ActiveAHSCalibrationsViewProps {
    records: AHSCalibrationRecord[];
    setRecords: React.Dispatch<React.SetStateAction<AHSCalibrationRecord[]>>;
}

export default function ActiveAHSCalibrationsView(props: ActiveAHSCalibrationsViewProps) {
return (
  <div className="ahs-calibration-view">
    {props.records.map((record) => (
      <AHSCalibrationCard
        key={record._id}
        ahsRecord={record}
        setAHSCalibrationRecords={props.setRecords}
      />
    ))}
  </div>
);
}