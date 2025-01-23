export interface TrackingNumberProps {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrackingNumber({
  label,
  id,
  value,
  onChange,
}: TrackingNumberProps) {
  return (
    <div className={`d-flex ${id === "workOrderNumber" && "me-2"}`}>
      <div>
        <label htmlFor={id} className="col-form-label col-form-label-sm">
          {label}
        </label>
      </div>
      <div>
        <input
          type="text"
          className="form-control"
          id={id}
          value={value || ""}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
