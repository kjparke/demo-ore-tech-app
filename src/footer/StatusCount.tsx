import React from 'react';


interface StatusCountProps {
  status: string;
  count: number;
}

export default function StatusCount(props: StatusCountProps) {
  return(
    <div className="d-flex align-items-center justify-content-center mx-3 mt-1">
      <p className="text-light text-center fw-bold text-capitalize pe-3">
        {props.status.replace("-", " ")}
      </p>
      <p className={`status-icon status-${props.status.toLowerCase()}`}>
        <span className="fw-bold text-light p-1">
          {props.count}
        </span>
      </p>
    </div>
  );
};
