import { DOWN_STATUSES } from "../../constants/GeneralConstants";

interface StatusDropdownProps {
  status: string;
  setStatus: (value: string) => void;
}

export default function StatusDropdown(props: StatusDropdownProps) {
  return (
    <div className="row mb-2">
      <label
        htmlFor="statusDropdown"
        className="col-sm-4 col-form-label col-form-label-sm"
      >
        Status
      </label>
      <div className="col">
        <select
          id="statusDropdown"
          className="form-control"
          value={props.status}
          onChange={(e) => {
            props.setStatus(e.target.value);
            e.stopPropagation();
          }}
        >
          <option value={DOWN_STATUSES.SCHEDULED}>Down scheduled</option>
          <option value={DOWN_STATUSES.UNSCHEDULED}>Down Unscheduled</option>
          <option value={DOWN_STATUSES.WAITING}>Down Waiting</option>
          <option value={DOWN_STATUSES.PENDING}>Pending</option>
        </select>
      </div>
    </div>
  );
}
