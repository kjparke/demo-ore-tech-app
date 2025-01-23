import { DateFormat } from "../constants/GeneralConstants";
import { formatDate } from "../helpers/AssetHelpers";
import { User } from "../interfaces/User";

interface UserActivityDetailsProps {
  createdBy?: User;
  lastUpdatedBy?: User;
  completedBy?: User;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserActivityDetails({ createdBy, lastUpdatedBy, completedBy, createdAt, updatedAt, completedAt }: UserActivityDetailsProps) {
  const creatorFullName = createdBy ? `${createdBy.firstName} ${createdBy.lastName}` : null;
  const updaterFullName = lastUpdatedBy ? `${lastUpdatedBy.firstName} ${lastUpdatedBy.lastName}` : null;
  const completedByFullName = completedBy ? `${completedBy.firstName} ${completedBy.lastName}` : null;

  return (
    <div className="row">
      <small>
        {creatorFullName
          ? (<span><b>Created by:</b> {creatorFullName} at{" "}</span>)
          : (<span><b>Created at:</b>{" "}</span>)}
        {formatDate(createdAt, DateFormat.MONTH_DAY_YEAR_HOUR)}
      </small>
      <br />
      <small>
        {updaterFullName
          ? (<span><b>Last updated by:</b> {updaterFullName} at{" "}</span>)
          : (<span><b>Updated at:</b>{" "}</span>)}
        {formatDate(updatedAt, DateFormat.MONTH_DAY_YEAR_HOUR)}
      </small>
      <br />
      <small>
        {completedByFullName ? 
          (<span><b>Completed by:</b> {completedByFullName} at{" "}{formatDate(completedAt, DateFormat.MONTH_DAY_YEAR_HOUR)}</span>)
          : null
        }
      </small>
    </div>
  );
}
