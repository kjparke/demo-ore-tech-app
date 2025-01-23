import React, { Dispatch, SetStateAction } from "react";
import { AssetFilters, defaultAssetFilters } from "../interfaces/Filter";
import FilterDropdown from "./FilterDropdown";
import { LOCATIONS, MAINTENANCE_STATUSES, MODEL_CODES, PLANNING_FILTERS } from "../constants/GeneralConstants";
import FilterToggle from "./FilterToggle";

interface FilterBarProps {
  filterBy: AssetFilters;
  setFilterBy: Dispatch<SetStateAction<AssetFilters>>;
}

export default function FilterBar(props: FilterBarProps) {
  return(
    <div className="row justify-content-end pe-3">
      <div className="col-auto my-auto">
        <p className="fw-semibold mb-0">Filter:</p>
      </div>
      <FilterDropdown
        filterBy={props.filterBy}
        setFilterBy={props.setFilterBy}
        filterList={MODEL_CODES}
        fieldKey="modelCode"
        label="Type"
        currentValue={props.filterBy.modelCode}
      />
      <FilterDropdown
        filterBy={props.filterBy}
        setFilterBy={props.setFilterBy}
        filterList={Object.values(LOCATIONS)}
        fieldKey="location"
        label="Location"
        currentValue={props.filterBy.location}
      />
      <FilterDropdown
        filterBy={props.filterBy}
        setFilterBy={props.setFilterBy}
        filterList={MAINTENANCE_STATUSES}
        fieldKey="secondaryStatus"
        label="Status"
        currentValue={props.filterBy.secondaryStatus}
      />
      <FilterDropdown
        filterBy={props.filterBy}
        setFilterBy={props.setFilterBy}
        filterList={PLANNING_FILTERS}
        fieldKey="planning"
        label="Actions"
        currentValue={props.filterBy.planning}
      />
      <FilterToggle
        filterBy={props.filterBy}
        setFilterBy={props.setFilterBy}
        fieldKey="hasWorkOrderNumber"
        label="Has Work Order Number"
        currentValue={props.filterBy.hasWorkOrderNumber}
      />
      <FilterToggle
        filterBy={props.filterBy}
        setFilterBy={props.setFilterBy}
        fieldKey="hasAssignedTechnicians"
        label="Has Assigned Technicians"
        currentValue={props.filterBy.hasAssignedTechnicians}
      />

      <div className="col-auto">
        <button 
          className="btn btn-filter clear-filter" 
          type="button"
          onClick={() => props.setFilterBy(defaultAssetFilters)}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
