import { useState } from "react";
import { Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  validate?: (value: string) => boolean;
  placeholder?: string;
  componentFormat?: string;
  errorMessage?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  validate,
  placeholder = "Enter text...",
  componentFormat = "",
  errorMessage = "Invalid input. Please check your entry.",

}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");
  const handleSave = () => {
    if (validate && !validate(newValue)) {
      alert(errorMessage);
      return;
    }

    onSave(newValue);
    setNewValue("");
    setIsEditing(false);
  };

  return (
    <div className={componentFormat}>
      {isEditing ? (
        <>
          <input
            placeholder={placeholder}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
          />
          <Button className="h-8 w-8" onClick={handleSave}>
            <Check/>
          </Button>
        </>
      ) : (
        <>
          <p>{value}</p>
          <Button className="w-8 h-8" onClick={() => setIsEditing(true)}>
            <Pencil />
          </Button>
        </>
      )}
    </div>
  );
};

export default EditableField;
