import React from "react";

interface ScheduleInputProps {
  label: string;
  id: string;
  value: string;
  min?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ScheduleInput({ label, id, value, min, onChange }: ScheduleInputProps) {
  return (
    <div className="row mb-3">
      <label htmlFor={id} className="col-sm-4 col-form-label col-form-label-sm">
        {label}
      </label>
      <div className="col">
        <input
          type="date"
          className="form-control"
          id={id}
          value={value}
          min={min}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
