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
        <div className="flex w-full flex-col gap-1 text-base">
          <p>{fieldName}</p>
          <input
            placeholder={placeholder}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full rounded-lg bg-card p-2 pl-4 focus-visible:outline-none focus-visible:ring-0"
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
