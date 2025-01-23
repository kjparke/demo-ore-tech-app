import "./shiftSummary.css";
import { formatStatus } from "../helpers/ShiftSummaryHelpers";
import { AssetShiftData } from "./EventChartInterfaces";
import ShiftSummaryModal from "./ShiftSummaryModal";
import RenderHourCells from "./RenderHourCells";
import SortableColumn from "../asset-view/SortableColumn";

interface Props {
  date: string;
  assetsData: AssetShiftData[];
  fetchData: () => void;
  sortColumns: { column: string; direction: "asc" | "desc" }[];
  handleSort: (column: string) => void;
}

export default function ShiftSummaryTable(props: Props) {
  const getSortDirection = (column: string) => {
    const sortColumn = props.sortColumns.find((col) => col.column === column);
    return sortColumn ? sortColumn.direction : undefined;
  };

  return (
    <>
      <table className="table-container table table-striped table-bordered table-hover mt-4 mb-4">
        <thead className="table-dark shift-summary-table-header">
          <tr>
              <SortableColumn
                  title="Unit ID"
                  isSorted={!!getSortDirection("unitId")}
                  sortDirection={getSortDirection("unitId")}
                  handleSort={() => props.handleSort("unitId")}
                />
            <th>Status</th>
            {Array.from({ length: 24 }, (_, i) => (
              <th key={i} className="hour-col">
                {i}:00
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.assetsData.map((asset) =>
            asset.events.map((event, index) => (
              <tr key={`${asset.unitId}-${index}`}>
                {index === 0 && (
                  <td rowSpan={asset.events.length}>
                    <span
                      className="status-text"
                      data-bs-toggle="modal"
                      data-bs-target={`#shift-summary-modal-${asset.unitId}`}
                    >
                      {asset.unitId}
                    </span>
                  </td>
                )}
                <td>{formatStatus(event.status, event.secondaryStatus)}</td>
                {Array.from({ length: 24 }, (_, hour) => (
                  <RenderHourCells key={`${asset.unitId}-${index}-${hour}`} eventDelta={event} hour={hour} />
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {props.assetsData.map((asset) => (
        <ShiftSummaryModal
          key={`shift-summary-modal-${asset.unitId}`}
          modalId={`shift-summary-modal-${asset.unitId}`}
          date={props.date}
          assetData={asset}
          refreshData={props.fetchData}
        />
      ))}
    </>
  );
}
