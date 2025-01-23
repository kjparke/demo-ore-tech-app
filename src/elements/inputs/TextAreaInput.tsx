import "./Input.css"

interface TextAreaInputProps {
  id: string;
  value: string;
  onChange: (key: string, e: any) => void;
  col?: number;
  readOnly?: boolean
}

export default function TextAreaInput(props: TextAreaInputProps) {
  return (
    <div>
      <textarea
        id={props.id}
        className="form-control fixed-height-textarea"
        value={props.value}
        onChange={(e) => props.onChange(e.target.id, e.target.value)}
      />
    </div>
  );
}