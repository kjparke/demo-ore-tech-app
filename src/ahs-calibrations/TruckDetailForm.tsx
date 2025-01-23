import { SetStateAction } from "react";
import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import AHSTextInputComponent from "./AHSTextInputComponent";
import DateInputComponent from "./DateInputComponent";

interface TruckDetailFormProps {
  ahsRecord: AHSCalibrationRecord;
  setAHSCalibrationRecord: React.Dispatch<SetStateAction<AHSCalibrationRecord>>;
  isForm?: boolean;
}

export default function TruckDetailForm(props: TruckDetailFormProps) {
  return (
    <>
      <div className="row p-3">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Truck
            </label>
            <h5>{props.ahsRecord.unitId}</h5>
          </div>
        </div>
        <div className="col">
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Location
            </label>
            <h5>{props.ahsRecord.location}</h5>
          </div>
        </div>
        <div className="col">
          <AHSTextInputComponent
            label="Minestar Version"
            value={props.ahsRecord.minestarVersion}
            id={
              props.ahsRecord._id
                ? `minestar-version-${props.ahsRecord._id}`
                : "minestar-version-form"
            }
            isForm={props.isForm}
            handleInput={(e) =>
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                minestarVersion: e.target.value,
              }))
            }
          />
        </div>
        <div className="col">
          <DateInputComponent
            label="Shop Release Date"
            value={props.ahsRecord.shopReleaseDate}
            id={
              props.ahsRecord._id
                ? `shop-release-date-${props.ahsRecord._id}`
                : "shop-release-date-form"
            }
            handleInput={(e) => {
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                shopReleaseDate: e.target.value,
              }));
            }}
            isForm={props.isForm}
          />
        </div>
        <div className="col">
          <DateInputComponent
            label="Date of Cals"
            value={props.ahsRecord.dateOfCals}
            id={
              props.ahsRecord._id
                ? `date-of-cals-${props.ahsRecord._id}`
                : "date-of-cals-form"
            }
            handleInput={(e) => {
              props.setAHSCalibrationRecord((prev) => ({
                ...prev,
                dateOfCals: e.target.value,
              }));
            }}
            isForm={props.isForm}
          />
        </div>
      </div>
    </>
  );
}
