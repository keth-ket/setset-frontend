interface EditableFieldProps {
  value: string;
  placeholder?: string;
  componentFormat?: string;
  isEditing?: boolean;
  fieldName?: string;
  newValue: string; // The value of the input from the parent state
  setNewValue: (value: string) => void; // A function to update the value from the parent
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  placeholder = "Enter text...",
  componentFormat = "",
  isEditing = false,
  fieldName = "Field",
  newValue ="",
  setNewValue,
}) => {

  return (
    <div className={componentFormat}>
      {isEditing ? (
        <div className="w-full flex flex-col gap-1 text-base">
          <p>{fieldName}</p>
          <input
            placeholder={placeholder}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full bg-card rounded-lg pl-4 p-2 focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>
      ) : (
        <>
          <p>{value}</p>
        </>
      )}
    </div>
  );
};

export default EditableField;
