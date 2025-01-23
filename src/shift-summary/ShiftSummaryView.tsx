import { useEffect, useState, useCallback } from "react";
import moment from "moment";
import DatePicker from "./DatePicker";
import ShiftSummaryTable from "./ShiftSummaryTable";
import API from "../Api";

export default function ShiftSummaryView() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [assetData, setAssetData] = useState([]);
  const [sortColumns, setSortColumns] = useState<{ column: string, direction: 'asc' | 'desc' }[]>([{ column: 'unitId', direction: 'asc' }]);

  const handleSort = (column: string) => {
    setSortColumns(prevSortColumns => {
      const existingSortColumn = prevSortColumns.find(col => col.column === column);

      if (existingSortColumn) {
        return prevSortColumns.map(col =>
          col.column === column ? { ...col, direction: col.direction === 'asc' ? 'desc' : 'asc' } : col
        );
      } else {
        return [{ column, direction: 'asc' }];
      }
    });
  };

  const fetchShiftSummary = useCallback(async () => {
    try {
      const selectedDate = moment(date).toISOString();
      const sortQuery = sortColumns.map(col => `${col.column}:${col.direction}`).join(',');
      const response = await API.get(`/eventDelta/?date=${selectedDate}&sort=${sortQuery}`);
      setAssetData(response.data);
    } catch (error) {
      console.error("Error fetching shift summary:", error);
    }
  }, [date, sortColumns]);

  useEffect(() => {
    fetchShiftSummary();
  }, [fetchShiftSummary, date]);

  return (
    <div className="shift-summary-view">
      <div className="card">
        <div className="card-body">
          <DatePicker date={date} setDate={setDate} />
          {assetData.length > 0 ? (
            <ShiftSummaryTable
              assetsData={assetData}
              date={date}
              fetchData={fetchShiftSummary}
              sortColumns={sortColumns} 
              handleSort={handleSort}
            />
          ) : (
            <div className="mt-4">
              <p>
                No shift summary data available for this date. Please try again
                by selecting another date.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
