import React from "react";

interface SchedulePlainTextProps {
  label: string;
  value: string | number;
}

export default function SchedulePlainText({ label, value}: SchedulePlainTextProps) {
  return (
    <div className="row mb-2">
      <label className="col-sm-4 col-form-label col-form-label-sm">
        {label}
      </label>
      <div className="col">
        <div className="form-control-plaintext">{value}</div>
      </div>
    </div>
  );
}
