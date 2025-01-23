interface BayDropdownProps {
  selectedLocation: string;
  selectedBay: string;
  setSelectedBay: (bay: string) => void;
  bayOptions: string[],
}

const BayDropdown = (props: BayDropdownProps) => {

  if (!['Truck Shop', 'Auxiliary Shop', 'Highmont Shop', 'Weld', 'Aprons', 'Off-Site'].includes(props.selectedLocation)) {
    return null;
  }

  return (
    <div className="row mb-2">
      <label htmlFor="locationDropdown" className="col-sm-4 col-form-label col-form-label-sm">
        Bay Number
      </label>
      <div className="col">
          <select
          id="bayDropdown"
          className="form-control"
          value={ props.selectedBay }
          onChange={(e) => props.setSelectedBay(e.target.value)}
          >
          { props.bayOptions.map(bayOption => (
            <option key={bayOption} value={bayOption}>
              {bayOption}
            </option>
          )) }
        </select>
      </div>
    </div>
  );
}

export default BayDropdown;
