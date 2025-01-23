import "../asset-view/Asset.css";
import "./ahs.css";
import { useEffect, useState, useCallback } from "react";
import { AHSCalibrationRecord } from "../interfaces/AHSCalibrationRecord";
import API from "../Api";
import Pagination from "../asset-view/Pagination";
import { formatDate } from "../helpers/AssetHelpers";
import { DateFormat } from "../constants/GeneralConstants";
import AHSCalModal from "./AHSCalModal";

export default function ArchivedAHSCalibrationsTable() {
  const [archivedAHSRecords, setArchivedAHSRecords] = useState<
    AHSCalibrationRecord[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchArchivedRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await API.get(
        `/ahsCalibrations/archived?page=${currentPage}&pageSize=${pageSize}`
      );
      setArchivedAHSRecords(res.data.records);
      setTotalPages(res.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error while retrieving the data");
      setIsLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchArchivedRecords();
  }, [fetchArchivedRecords]);

  return (
    <>
      {archivedAHSRecords.length > 0 ? (
        <div className="table-container ahs-archive-view">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Unit</th>
                <th scope="col">Location</th>
                <th scope="col">Minestar Version</th>
                <th scope="col">Shop Release Date</th>
                <th scope="col">Date of Cals</th>
              </tr>
            </thead>
            <tbody>
              {archivedAHSRecords.map((record) => (
                <tr
                  key={record._id}
                  data-bs-target={`#archive-modal-${record._id}`}
                  data-bs-toggle="modal"
                >
                  <td>{record.unitId}</td>
                  <td>{record.location || ""}</td>
                  <td>{record.minestarVersion || ""}</td>
                  <td>
                    {record.shopReleaseDate
                      ? formatDate(
                          record.shopReleaseDate,
                          DateFormat.MONTH_DAY_YEAR_HOUR
                        )
                      : ""}
                  </td>
                  <td>
                    {record.dateOfCals
                      ? formatDate(
                          record.dateOfCals,
                          DateFormat.MONTH_DAY_YEAR_HOUR
                        )
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {archivedAHSRecords.map((record) => (
            <AHSCalModal
              key={`modal-${record._id}`}
              modalId={`archive-modal-${record._id}`}
              record={record}
              fetchData={fetchArchivedRecords}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="card mt-4">
					<p className="text-center mt-3">There are no archived records yet.</p>
				</div>
      )}
    </>
  );
}
