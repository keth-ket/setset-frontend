import { useState } from "react";

interface EditableFieldProps {
  value: string;
  placeholder?: string;
  componentFormat?: string;
  isEditing?: boolean;
  fieldName?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  placeholder = "Enter text...",
  componentFormat = "",
  isEditing = false,
  fieldName = "Field",
}) => {
  const [newValue, setNewValue] = useState("");

  return (
    <div className={componentFormat}>
      {isEditing ? (
        <>
          <p>{fieldName}</p>
          <input
            placeholder={placeholder}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full bg-inherit border border-card rounded-xl p-2 focus-visible:ring-0 focus-visible:outline-none"
          />
        </>
      ) : (
        <>
          <p>{value}</p>
        </>
      )}
    </div>
  );
};

export default EditableField;
