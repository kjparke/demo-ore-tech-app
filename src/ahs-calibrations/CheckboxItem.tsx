import React from "react";
import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";

interface CheckboxItemProps {
  label: string;
  id: string;
  value: any;
  ahsRecord: AHSCalibrationRecord;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isForm?: boolean;
}

export default function CheckboxItem(props: CheckboxItemProps) {
  const checkboxInput = (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={props.id}
        checked={props.value}
        onChange={props.handleInput}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );

  const checkboxItemReadOnly = (
    <div>
      <i className={`bi ${props.value ? "bi-check-square-fill" : "bi-square"}`}></i>
      <span className="ms-2" style={{ userSelect: "none" }}>
        {props.label}
      </span>
    </div>
  );

  return <>{props.isForm ? checkboxInput : checkboxItemReadOnly}</>;
}
