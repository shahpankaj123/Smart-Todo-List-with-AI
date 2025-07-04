const priorityMap = {
  1: { color: "bg-green-100 text-green-800", label: "Very Low" },
  2: { color: "bg-green-100 text-green-800", label: "Low" },
  3: { color: "bg-green-100 text-green-800", label: "Low-Medium" },
  4: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
  5: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
  6: { color: "bg-yellow-100 text-yellow-800", label: "Medium-High" },
  7: { color: "bg-orange-100 text-orange-800", label: "High" },
  8: { color: "bg-orange-100 text-orange-800", label: "High" },
  9: { color: "bg-red-100 text-red-800", label: "Very High" },
  10: { color: "bg-red-100 text-red-800", label: "Critical" },
};

export default function PriorityBadge({ priority }) {
  // Ensure priority is within 1-10 range, default to medium if invalid
  const normalizedPriority =
    Math.min(Math.max(Math.floor(priority), 1), 10) || 5;
  const { color, label } = priorityMap[normalizedPriority];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}
