import { createCategory, fetchCategories } from "@/app/lib/api";
import { useState, useEffect } from "react";

export default function CategorySelector({ value, onChange }) {
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCustomCategorySubmit = async () => {
    if (!customCategory.trim()) return;
    try {
      const newCategory = await createCategory(customCategory.trim());
      setCategories([...categories, newCategory]);
      onChange(newCategory.name);
      setCustomCategory("");
      setShowCustomInput(false);
    } catch (err) {
      console.error("Failed to create category:", err);
      setError("Failed to create category.");
    }
  };

  if (loading)
    return <div className="text-sm text-gray-500">Loading categories...</div>;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.CategoryID}
            type="button"
            onClick={() => onChange(category.CategoryID)}
            className={`px-3 py-1 rounded-full text-sm border ${
              value === category.CategoryID
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {category.Category}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowCustomInput(true)}
          className="px-3 py-1 rounded-full text-sm bg-gray-100 border"
        >
          + Custom
        </button>
      </div>

      {showCustomInput && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="New category"
            className="flex-1 p-2 border rounded-md text-sm"
          />
          <button
            type="button"
            onClick={handleCustomCategorySubmit}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowCustomInput(false)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
