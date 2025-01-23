import React from 'react';

interface StatusDropdownProps {
  label: string;
  id: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  label,
  id,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="row mb-2">
      <label htmlFor={id} className="col-sm-4 col-form-label col-form-label-sm">
        {label}
      </label>
      <div className="col">
        <select id={id} className="form-control" value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StatusDropdown;
