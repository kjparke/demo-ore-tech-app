import { useAppContext } from "../../context/AppContext";

interface SecondaryStatusDropdownProps {
  secondaryStatus: string;
  setSecondaryStatus: (value: string) => void;
  
}

export default function SecondaryStatusDropdown(props: SecondaryStatusDropdownProps) {
  const { secondaryStatuses } = useAppContext();

  return (
    <div className="row mb-2">
      <label
        htmlFor="secondaryStatus"
        className="col-sm-4 col-form-label col-form-label-sm"
      >
        Secondary Status
      </label>
      <div className="col">
        <select
          id="secondaryStatus"
          className="form-control"
          value={props.secondaryStatus}
          onChange={(e) => {
            e.persist();
            props.setSecondaryStatus(e.target.value);
          }}
        >
          {secondaryStatuses.length > 0 && secondaryStatuses.map((sec_status) => (
            <option key={sec_status} value={sec_status}>
              {sec_status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
