import { ChangeEvent } from "react";

interface StatusChangeToggleProps {
  statusToggleValue: boolean;
  onManualStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function StatusChangeToggle(props: StatusChangeToggleProps) {
  const { statusToggleValue, onManualStatusChange } = props;

  return (
    <div className="alert alert-warning manual-status__alert" role="alert">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <p className="mb-0">Manual status change - Wenco/Minestar updates paused.</p>
        </div>
     
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="isStatusChangeManual"
          checked={statusToggleValue}
          onChange={onManualStatusChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Manual Updates
        </label>
      </div>
      </div>
    </div>
  );
}
