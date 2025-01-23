import React, { Dispatch, SetStateAction } from "react";
import { AssetFilters } from "../interfaces/Filter";

interface FilterDropdownProps {
  label: string;
  fieldKey: string;
  currentValue: string[];
  filterBy: AssetFilters;
  setFilterBy: Dispatch<SetStateAction<AssetFilters>>;
  filterList: string[];
}

export default function FilterDropdown(props: FilterDropdownProps) {

  const handleCheckboxChange = (item: string) => {
    const newFilterValue = props.currentValue.includes(item)
      ? props.currentValue.filter(value => value !== item)
      : [...props.currentValue, item];

    props.setFilterBy({...props.filterBy, [props.fieldKey]: newFilterValue});
  };

  return(
    <div className="col-auto">
      <div className="dropdown">
        <button 
          className="btn btn-filter dropdown-toggle w-100 text-capitalize" 
          type="button" 
          id="type-dropdown" 
          data-bs-toggle="dropdown"
        >
          {props.label}: {props.currentValue.length > 0 ? props.currentValue.join(", ") : "All"}
        </button>
        <ul className="dropdown-menu filter-dropdown">
          {props.filterList.map(item => 
            <li key={item}>
              <div className="dropdown-item d-flex">
                <input 
                  className="form-check-input me-1" 
                  type="checkbox" 
                  checked={props.currentValue.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                {item}
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
