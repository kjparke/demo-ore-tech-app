import { SetStateAction } from "react";
import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import CheckboxItem from "./CheckboxItem";
interface TruckCalibrationChecklistProps {
  ahsRecord: AHSCalibrationRecord;
  setAHSCalibrationRecord: React.Dispatch<SetStateAction<AHSCalibrationRecord>>;
  isForm?: boolean;
}

export default function TruckCalibrationChecklist(
  props: TruckCalibrationChecklistProps
) {
  return (
    <>
      <div className="row">
        <div className="col">
          <CheckboxItem
            label="Radar/Lidar Check"
            id={props.ahsRecord._id ? `radar-lidar-check-${props.ahsRecord._id}`: "radar-lidar-check-form"}
            value={props.ahsRecord.radarLidarCheck}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                radarLidarCheck: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />

          <CheckboxItem
            label="ARM/Steering Solenoid"
            id={props.ahsRecord._id ? `steering-solenoid-${props.ahsRecord._id}`: "steering-solenoid-form"}
            value={props.ahsRecord.steeringSolenoid}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                steeringSolenoid: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />
        </div>
        <div className="col">
          <CheckboxItem
            label="Brakes Solenoid"
            id={props.ahsRecord._id ? `brakes-solenoid-${props.ahsRecord._id}`: "brakes-solenoid-form"}
            value={props.ahsRecord.brakeSolenoid}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                brakeSolenoid: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />

          <CheckboxItem
            label="GAMS"
            id={props.ahsRecord._id ? `gams-${props.ahsRecord._id}`: "gams-form"}
            value={props.ahsRecord.gams}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                gams: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />

          <CheckboxItem
            label="Positioning/Survey"
            id={props.ahsRecord._id ? `positioning-survey-${props.ahsRecord._id}`: "positioning-survey-form"}
            value={props.ahsRecord.positioningSurvey}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                positioningSurvey: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />
        </div>
        <div className="col">
          <CheckboxItem
            label="Perception Cal"
            id={props.ahsRecord._id ? `perception-cal-${props.ahsRecord._id}`: "perception-cal-form"}
            value={props.ahsRecord.perceptionCal}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                perceptionCal: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />

          <CheckboxItem
            label="Planning Checkout Straight Ahead"
            id={props.ahsRecord._id ? `planning-chkt-strt-ahd-${props.ahsRecord._id}`: "planning-chkt-strt-ahd-form"}
            value={props.ahsRecord.planningCheckoutStraightAhead}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                planningCheckoutStraightAhead: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />

          <CheckboxItem
            label="Planning Checkout Steering"
            id={props.ahsRecord._id ? `planning-chkt-steering-${props.ahsRecord._id}`: "planning-chkt-steering-form"}
            value={props.ahsRecord.planningCheckoutSteering}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                planningCheckoutSteering: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />
        </div>
        <div className="col">
          <CheckboxItem
            label="Planning Checkout Brakes"
            id={props.ahsRecord._id ? `planning-chkt-brakes-${props.ahsRecord._id}`: "planning-chkt-brakes-form"}
            value={props.ahsRecord.planningCheckoutBraking}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                planningCheckoutBraking: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />
          
          <CheckboxItem
            label="Planning Incycle"
            id={props.ahsRecord._id ? `planning-chkt-incycle-${props.ahsRecord._id}`: "planning-chkt-incycle-form"}
            value={props.ahsRecord.planningCheckoutInCycle}
            ahsRecord={props.ahsRecord}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                planningCheckoutInCycle: e.target.checked,
              }))
            }
            isForm={props.isForm}
          />
        </div>
      </div>
    </>
  );
}
