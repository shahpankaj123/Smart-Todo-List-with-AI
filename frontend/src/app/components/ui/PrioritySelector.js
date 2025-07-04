const priorityOptions = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-red-100 text-red-800" },
];

export default function PrioritySelector({ value, onChange }) {
  return (
    <div className="flex space-x-2">
      {priorityOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 rounded-full text-sm ${option.color} ${
            value === option.value ? "ring-2 ring-offset-1 ring-primary" : ""
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
