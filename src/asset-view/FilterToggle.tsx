import React, { Dispatch, SetStateAction } from "react";
import { AssetFilters } from "../interfaces/Filter";

interface FilterToggleProps {
  label: string;
  fieldKey: keyof AssetFilters;
  currentValue: boolean;
  filterBy: AssetFilters;
  setFilterBy: Dispatch<SetStateAction<AssetFilters>>;
}

export default function FilterToggle(props: FilterToggleProps) {
  const handleToggleChange = () => {
    props.setFilterBy({ ...props.filterBy, [props.fieldKey]: !props.currentValue });
  };

  return (
    <div className="col-auto form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={props.currentValue}
        onChange={handleToggleChange}
        id={`toggle-${props.fieldKey}`}
      />
      <label className="form-check-label" htmlFor={`toggle-${props.fieldKey}`}>
        {props.label}
      </label>
    </div>
  );
}
