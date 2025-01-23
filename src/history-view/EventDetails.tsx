import { DateFormat } from "../constants/GeneralConstants";
import { formatDate } from "../helpers/AssetHelpers";
import { AssetHistorySearchResult } from "../interfaces/AssetHistorySearchResult";

interface EventDetailsProps {
  currentEvent: AssetHistorySearchResult | undefined;
}

export default function EventDetails(props: EventDetailsProps) {
  const { currentEvent } = props;

  const workOrderNumber = currentEvent?.workOrderNumber || "N/A";
  const purchaseOrderNumber = currentEvent?.purchaseOrderNumber || "N/A";

  const safelyFormatDate = (date?: string) => {
    return date ? formatDate(date, DateFormat.MONTH_DAY_YEAR_HOUR) : "N/A";
  }

  const dateDown = safelyFormatDate(currentEvent?.downDate);
  const scheduledOutDate = safelyFormatDate(currentEvent?.scheduleOutDate || "");
  const actualOutDate = safelyFormatDate(currentEvent?.actualOutDate || "");

  return (
    <div className="card mt-2">
      <div className="row">
        <div className="col">
          <small>Work Order Number</small>
          <p>{workOrderNumber}</p>
        </div>
        <div className="col">
          <small>Purchase Order Number</small>
          <p>{purchaseOrderNumber}</p>
        </div>
      </div>
      <hr></hr>
      <div className="row mt-1">
          <label className="col">Date Down</label>
          <p className="col">{dateDown}</p>
      </div>
      <div className="row">
          <label className="col">Scheduled Out Date</label>
          <p className="col">{scheduledOutDate}</p>
      </div>
      <div className="row">
          <label className="col">Actual Out Date</label>
          <p className="col">{actualOutDate}</p>
      </div>
    </div>
  );
}
