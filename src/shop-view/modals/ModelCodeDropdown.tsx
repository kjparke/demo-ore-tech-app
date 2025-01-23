import { MODEL_CODES } from "../../constants/GeneralConstants";

interface ModelCodeDropdownInterface {
  modelCode: string;
  setModelCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModelCodeDropdown(props: ModelCodeDropdownInterface) {
  return (
    <div className="row mb-2">
      <label
        htmlFor="modelCodeDropdown"
        className="col-sm-4 col-form-label col-form-label-sm"
      >
        Model Code
      </label>
      <div className="col-sm-8">
        <select
          id="assetDropdown"
          className="form-control"
          value={props.modelCode}
          onChange={(e) => props.setModelCode(e.target.value)}
        >
          {MODEL_CODES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
