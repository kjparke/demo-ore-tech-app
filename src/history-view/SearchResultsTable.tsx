import React from "react";
import { AssetHistorySearchResult } from "../interfaces/AssetHistorySearchResult";
import { formatDate } from "../helpers/AssetHelpers";
import { DateFormat } from "../constants/GeneralConstants";
import AssetHistoryModal from "./AssetHistoryModal";
import SortableColumn from "../asset-view/SortableColumn";

interface SearchResultsTableProps {
  searchResults: Array<AssetHistorySearchResult>;
  sortColumns: { column: string; direction: "asc" | "desc" }[];
  handleSort: (column: string) => void;
}

export default function SearchResultsTable({
  searchResults,
  sortColumns,
  handleSort,
}: SearchResultsTableProps) {
  const getSortDirection = (column: string) => {
    const sortColumn = sortColumns.find((col) => col.column === column);
    return sortColumn ? sortColumn.direction : undefined;
  };

  return (
    <div>
      {searchResults.length > 0 ? (
        <table className="table table-striped table-bordered table-hover mt-2">
          <thead className="table-dark">
            <tr>
              <th scope="col">
                <SortableColumn
                  title="Unit ID"
                  isSorted={!!getSortDirection("unitId")}
                  sortDirection={getSortDirection("unitId")}
                  handleSort={() => handleSort("unitId")}
                />
              </th>
              <th scope="col">
                <SortableColumn
                  title="Model Code"
                  isSorted={!!getSortDirection("modelCode")}
                  sortDirection={getSortDirection("modelCode")}
                  handleSort={() => handleSort("modelCode")}
                />
              </th>
              <th scope="col">
                <SortableColumn
                  title="Last Location"
                  isSorted={!!getSortDirection("location")}
                  sortDirection={getSortDirection("location")}
                  handleSort={() => handleSort("location")}
                />
              </th>
              <th scope="col">
                <SortableColumn
                  title="Status Detail"
                  isSorted={!!getSortDirection("secondaryStatus")}
                  sortDirection={getSortDirection("secondaryStatus")}
                  handleSort={() => handleSort("secondaryStatus")}
                />
              </th>
              <th scope="col">Start Date</th>
              <th scope="col">Actual Out Date</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((searchResult) => (
              <tr
                key={searchResult._id}
                data-bs-target={`#asset-history-modal-${searchResult._id}`}
                data-bs-toggle="modal"
              >
                <td>{searchResult.unitId}</td>
                <td>{searchResult.modelCode}</td>
                <td>
                  {searchResult.bay
                    ? `${searchResult.location} - ${searchResult.bay}`
                    : searchResult.location}
                </td>
                <td>{searchResult.secondaryStatus}</td>
                <td>
                  {formatDate(searchResult.downDate, DateFormat.YEAR_MONTH_DAY)}
                </td>
                <td>
                  {searchResult.actualOutDate
                    ? formatDate(
                        searchResult.actualOutDate,
                        DateFormat.YEAR_MONTH_DAY
                      )
                    : "N/A"}
                </td>
                <td>
                  {searchResult.durationInHours
                    ? `${searchResult.durationInHours.toFixed(2)} Hrs`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-3">
          No search results. Type your query into the search box or click search
          to get all down events recorded within the last 7 days.
        </p>
      )}
      {searchResults.map((searchResult) => (
        <AssetHistoryModal
          key={`modal-${searchResult._id}`}
          modalId={`asset-history-modal-${searchResult._id}`}
          searchResult={searchResult}
        />
      ))}
    </div>
  );
}
