import React from "react";

interface CheckboxProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  label,
  id,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <div className="col-md-4">
      <label htmlFor={id} className="form-check-label">
        {label}
      </label>
      <input
        type="checkbox"
        className="form-check-input ms-3"
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}
