import { DateFormat } from "../constants/GeneralConstants";
import { formatDate } from "../helpers/AssetHelpers";

interface LastUpdatedProps {
  lastUpdated: string;
  isAutoRefresh?: boolean;
}

export default function LastUpdated(props: LastUpdatedProps) {
  return (
    <div className="row">
      <div className="mb-2 text-end">
        <small>
          Last Updated:{" "}
          {formatDate(props.lastUpdated, DateFormat.MONTH_DAY_YEAR_HOUR)}
        </small>
      </div>
    </div>
  );
}
