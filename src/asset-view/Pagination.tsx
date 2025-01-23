import React, { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
}

export default function Pagination(props: PaginationProps) {
  const loading = (
    <>
      <div className="spinner-border spinner-border-sm me-2" role="status">
      </div>
      <small className="me-2">Loading...</small>
    </>
  );

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.setPageSize(Number(event.target.value));
    props.setCurrentPage(1);
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-3 pb-3">
      <div>
        <span className="me-3">Records per Page:</span>
        <select onChange={handlePageSizeChange} value={props.pageSize}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div>
        {props.isLoading && loading}
        <button
          className="btn btn-sm btn-inverse"
          onClick={() => props.setCurrentPage(props.currentPage - 1)}
          disabled={props.isLoading || props.currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          {`${props.currentPage} / ${props.totalPages}`}
        </span>
        <button
          className="btn btn-sm btn-inverse"
          onClick={() => props.setCurrentPage(props.currentPage + 1)}
          disabled={props.isLoading || props.currentPage === props.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
