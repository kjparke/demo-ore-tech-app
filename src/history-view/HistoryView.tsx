import { useEffect, useState, useCallback } from "react";
import "./history.css";
import SearchResultsTable from "./SearchResultsTable";
import { AssetHistorySearchResult } from "../interfaces/AssetHistorySearchResult";
import API from "../Api";
import Pagination from "../asset-view/Pagination";

export default function HistoryView() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<AssetHistorySearchResult>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumns, setSortColumns] = useState<{ column: string, direction: 'asc' | 'desc' }[]>([]);

  const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState(last7Days.toISOString().slice(0, 16));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16));

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timerId);
  }, [inputValue]);

  const searchForAssets = useCallback(async () => {
    setIsLoading(true);
    try {
      const sortQuery = sortColumns.map(col => `${col.column}:${col.direction}`).join(',');
      const response = await API.get(
        `/asset-history/?searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}&limit=${pageSize}&sort=${sortQuery}`
      );
      if (response.data && response.data.searchResult) {
        setSearchResults(response.data.searchResult);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        console.error("Expected an object with 'searchResult' from the API, but received:", response.data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setSearchResults([]);
    }
    setIsLoading(false);
  }, [searchQuery, startDate, endDate, currentPage, pageSize, sortColumns]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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

  useEffect(() => {
    if (searchQuery || (startDate && endDate)) {
      searchForAssets();
    }
  }, [startDate, endDate, searchQuery, searchForAssets]);

  return (
    <div className="card mt-4 mb-4">
      <h4>Asset Historical Records</h4>
      <div className="d-flex flex-wrap">
        <div className="form-group col-7 me-2">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            className="form-control"
            id="search"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-auto me-2">
          <label htmlFor="startDateInput">Start Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="startDateInput"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group col-auto me-2">
          <label htmlFor="endDateInput">End Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="endDateInput"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={searchForAssets}
          className="btn btn-primary mt-4 search-button"
        >
          Search
        </button>
      </div>
      <hr />
      <SearchResultsTable searchResults={searchResults} sortColumns={sortColumns} handleSort={handleSort} />
      {searchResults.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
