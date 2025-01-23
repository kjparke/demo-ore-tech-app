import React from "react";


export default function BayOverCapacityAlert() {
  return(
    <div className="text-center alert alert-danger p-0">
      <i className="bi bi-exclamation-triangle-fill conflict-icon me-2"></i>
      <span>Bay Capacity Exceeded!</span>
    </div>
  );
}
