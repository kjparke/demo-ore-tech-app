import { useState } from "react";
import { OperationalAsset } from "../../interfaces/Asset";

interface AssetDropdownProps {
  unitId: string;
  setUnitId: React.Dispatch<React.SetStateAction<string>>;
	isFreeText: boolean;
	setIsFreeText: React.Dispatch<React.SetStateAction<boolean>>;
  operationalAssets: OperationalAsset[];
}

export default function AssetDropdown(props: AssetDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleInput = () => {
    props.setIsFreeText(!props.isFreeText);
    setIsOpen(false);
  };

  return (
    <div className="row mb-2">
      <label
        htmlFor="assetDropdown"
        className="col-sm-4 col-form-label col-form-label-sm"
      >
        Unit ID
      </label>
      <div className="col">
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={toggleDropdown}
            >
              Input Toggle
            </button>
            <div className={`dropdown-menu${isOpen ? " show" : ""}`}>
              <button
                className="dropdown-item"
                type="button"
                onClick={toggleInput}
              >
                {props.isFreeText ? "Asset List" : "Free Text"}
              </button>
            </div>
          </div>
          {props.isFreeText ? (
            <input
              type="text"
              className="form-control"
              id="unitId"
              placeholder="Enter unit ID"
              onChange={(e) => props.setUnitId(e.target.value)}
            />
          ) : (
            <select
              id="assetDropdown"
              className="form-control"
              value={props.unitId}
              onChange={(e) => props.setUnitId(e.target.value)}
            >
							<option value="">Select Unit ID</option>
              {props.operationalAssets.map((asset) => (
                <option key={asset.unitId} value={asset.unitId}>
                  {asset.unitId}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
