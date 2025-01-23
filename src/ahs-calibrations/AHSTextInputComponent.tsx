interface AHSTextInputComponentProps {
  label: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  isForm?: boolean;
}

export default function AHSTextInputComponent(
  props: AHSTextInputComponentProps
) {
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {props.label}
      </label>
      {props.isForm ? (
        <input
        type="text"
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.handleInput}
      />
      ) : <h5>{props.value}</h5>}
    </div>
  );
}
