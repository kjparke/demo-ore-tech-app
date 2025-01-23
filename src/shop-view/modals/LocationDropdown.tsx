import { LOCATIONS } from "../../constants/GeneralConstants";

interface LocationDropdownProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const locations = Object.values(LOCATIONS);

const LocationDropdown = (props: LocationDropdownProps) => {
  return (
    <div className="row mb-2">
      <label
        htmlFor="locationDropdown"
        className="col-sm-4 col-form-label col-form-label-sm"
      >
        Location
      </label>
      <div className="col">
        <select
          id="locationDropdown"
          className="form-control"
          value={props.selectedLocation}
          onChange={(e) => props.setSelectedLocation(e.target.value)}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationDropdown;
