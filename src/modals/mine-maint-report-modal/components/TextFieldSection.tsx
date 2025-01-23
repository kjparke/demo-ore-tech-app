import TextAreaInput from "../../../elements/inputs/TextAreaInput";

interface TextFieldSectionProps {
    id: string;
    label: string;
    value: string;
    onChange: (key: string, value: string) => void;
}

export default function TextFieldSection({
    id,
    label, 
    value, 
    onChange
}: TextFieldSectionProps) {
    return (
       <div className="mb-2">
         <h5 className="mb-2">{label}</h5>
            <TextAreaInput
              id={id}
              value={value || ""}
              onChange={onChange}
            />
       </div>
    )
}