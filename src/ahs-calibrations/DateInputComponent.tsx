import React from "react";

interface DateInputComponentProps {
  label: string;
  id: string;
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isForm?: boolean;
}

export default function DateInputComponent(props: DateInputComponentProps) {
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {props.label}
      </label>
      {props.isForm ? (
        <input
          type="date"
          className="form-control"
          id={props.id}
          readOnly={!props.isForm}
          value={props.value}
          onChange={props.handleInput}
        />
      ) : (
        <h5> {props.value ? props.value : "N/A"}</h5>
      )}
    </div>
  );
}
