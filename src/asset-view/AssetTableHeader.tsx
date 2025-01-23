import plan from "../images/plan.png";
import tow from "../images/tow-truck.png";
import wash from "../images/wash.png";
import calendar from "../images/calendar.png";
import check from "../images/check.png";
import SortableColumn from "./SortableColumn";

export interface SortColumn {
  column: string;
  direction: "asc" | "desc";
}

interface AssetTableHeaderProps {
  sortColumns: SortColumn[];
  onSort: (column: string) => void;
  onRemoveSort: (column: string) => void;
}

export default function AssetTableHeader({
  sortColumns,
  onSort,
  onRemoveSort,
}: AssetTableHeaderProps) {
  return (
    <thead className="table-dark">
      <tr>
        <th scope="col">
          <SortableColumn
            title="Unit"
            isSorted={sortColumns.some((col) => col.column === "unitId")}
            sortDirection={sortColumns.find((col) => col.column === "unitId")?.direction}
            handleSort={() => onSort("unitId")}
          />
        </th>
        <th scope="col">
          <SortableColumn
            title="Type"
            isSorted={sortColumns.some((col) => col.column === "modelCode")}
            sortDirection={
              sortColumns.find((col) => col.column === "modelCode")?.direction
            }
            handleSort={() => onSort("modelCode")}
          />
        </th>
        <th scope="col">
          <SortableColumn
            title="Location"
            isSorted={sortColumns.some((col) => col.column === "location")}
            sortDirection={
              sortColumns.find((col) => col.column === "location")?.direction
            }
            handleSort={() => onSort("location")}
          />
        </th>
        <th scope="col">
          <SortableColumn
            title="Status Detail"
            isSorted={sortColumns.some((col) => col.column === "secondaryStatus")}
            sortDirection={
              sortColumns.find((col) => col.column === "secondaryStatus")
                ?.direction
            }
            handleSort={() => onSort("secondaryStatus")}
          />
        </th>
        <th scope="col">Work Order</th>
        <th scope="col">Expected Completion</th>
        <th scope="col">
          <img
            src={plan}
            className="asset-view-logo"
            alt="Calendar logo"
            title="To be planned"
          />
        </th>
        <th scope="col">
          <img
            src={tow}
            className="asset-view-logo"
            alt="Tow truck logo"
            title="To be towed"
          />
        </th>
        <th scope="col">
          <img
            src={wash}
            className="asset-view-logo"
            alt="Water droplet and sparkle logo"
            title="To be washed"
          />
        </th>
        <th scope="col">
          <img
            src={calendar}
            className="asset-view-logo"
            alt="To be scheduled icon"
            title="To be scheduled"
          />
        </th>
        <th scope="col">
          <img
            src={check}
            className="asset-view-logo"
            alt="Ready to break-in icon"
            title="Ready to break-in"
          />
        </th>
        <th scope="col">Assigned Technicians</th>
        <th scope="col">Last Comments</th>
      </tr>
    </thead>
  );
}
