import "./Asset.css";
import Availability from "../availability/Availability";
import { useState, useEffect, useCallback } from "react";
import { Asset } from "../interfaces/Asset";
import { Note } from "../interfaces/Note";
import AssetTable from "./AssetTable";
import Pagination from "./Pagination";
import { AssetFilters, defaultAssetFilters } from "../interfaces/Filter";
import FilterBar from "./FilterBar";
import LastUpdated from "../components/LastUpdated";
import API from "../Api";
import { ModalStateProvider } from "../modals/ModalStateContext";
import { SortColumn } from "./AssetTableHeader";

export interface DownAssetPage {
  assets: { asset: Asset; latestNote: Note | null }[];
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  filterBy: AssetFilters;
}

export default function AssetView() {
  const [assets, setAssets] = useState<
    { asset: Asset; latestNote: Note }[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filterBy, setFilterBy] = useState<AssetFilters>(defaultAssetFilters);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([
    { column: "unitId", direction: "asc" },
  ]);

  const getQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      pageSize: pageSize.toString(),
      location: filterBy.location.join(","),
      modelCode: filterBy.modelCode.join(","),
      secondaryStatus: filterBy.secondaryStatus.join(","),
      planning: filterBy.planning.join(","),
      hasWorkOrderNumber: String(filterBy.hasWorkOrderNumber),
      hasAssignedTechnicians: String(filterBy.hasAssignedTechnicians),
    });

    sortColumns.forEach((col, index) => {
      queryParams.append(`sort[${index}][column]`, col.column);
      queryParams.append(`sort[${index}][direction]`, col.direction);
    });
    return queryParams;
  }, [
    currentPage,
    filterBy.hasAssignedTechnicians,
    filterBy.hasWorkOrderNumber,
    filterBy.location,
    filterBy.modelCode,
    filterBy.planning,
    filterBy.secondaryStatus,
    pageSize,
    sortColumns,
  ]);

  const handleSort = (column: string) => {
    let updatedSortColumns: SortColumn[] = [];
    const existingSortColumn = sortColumns.find((col) => col.column === column);

    if (existingSortColumn) {
      updatedSortColumns.push({
        column: column,
        direction: existingSortColumn.direction === "asc" ? "desc" : "asc",
      });
    } else {
      updatedSortColumns.push({ column: column, direction: "asc" });
    }

    setSortColumns(updatedSortColumns);
  };

  const handleRemoveSort = (column: string) => {
    setSortColumns([]);
  };

  const fetchDownAssetPage = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = getQueryParams();
      const response = await API.get(`/asset-view?${queryParams.toString()}`);

      setAssets(response.data.assets);
      setTotalPages(response.data.totalPages);
      console.log(response.data)
    } catch (error) {
      alert("There was an error while retrieving the data");
    } finally {
      setIsLoading(false);
    }
  }, [getQueryParams]);

  const fetchQueryCSV = useCallback(async () => {
    try {
      const queryParams = getQueryParams();
      const response = await API.get(`/asset-view/export?${queryParams.toString()}`, {
        responseType: 'blob', 
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ore-tech-asset-view.csv'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    } catch (error) {
      console.error(error);
      alert("There was an error while exporting the data");
    }
  }, [getQueryParams]);

  const fetchLastUpdated = useCallback(async () => {
    try {
      const response = await API.get("/physicalAvailability/lastUpdated");
      setLastUpdated(response.data.lastUpdated);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchLastUpdated();
    fetchDownAssetPage();
  }, [fetchLastUpdated, fetchDownAssetPage]);

  return (
    <ModalStateProvider>
      <div>
        <LastUpdated lastUpdated={lastUpdated} />
        <div className="row">
          <div className="col-md-12">
            <Availability />
          </div>
        </div>
        <div className="card table-card">
          <div className="d-flex justify-content-between">
            <button
              className="btn export-button"
              type="button"
              onClick={fetchQueryCSV}
            >
              Export Query Results
            </button>
            <FilterBar filterBy={filterBy} setFilterBy={setFilterBy} />
          </div>
          <AssetTable
            assets={assets}
            refreshData={fetchDownAssetPage}
            sortColumns={sortColumns}
            onSort={handleSort}
            onRemoveSort={handleRemoveSort}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={isLoading}
          />
        </div>
      </div>
    </ModalStateProvider>
  );
}
