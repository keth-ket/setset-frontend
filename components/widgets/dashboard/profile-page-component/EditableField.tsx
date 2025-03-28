import { useState } from "react";
import { Component, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  validate?: (value: string) => boolean;
  placeholder?: string;
  componentFormat?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  validate,
  placeholder = "Enter text...",
  componentFormat = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleSave = () => {
    if (validate && !validate(newValue)) {
      alert("Invalid input. Please check your entry.");
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
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <p>{value}</p>
          <Button onClick={() => setIsEditing(true)}>
            <Pencil />
          </Button>
        </>
      )}
    </div>
  );
};

export default EditableField;
