import { useState, useEffect } from "react";
import { getAITaskSuggestions } from "../lib/api";

export default function AISuggestions({ currentTask, onSuggestionApplied }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAITaskSuggestions(currentTask);
      setSuggestions(data);
    } catch (err) {
      setError("Failed to get AI suggestions. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [currentTask.title, currentTask.description]);

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">AI Suggestions</h4>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <p className="text-danger text-sm">{error}</p>
      ) : suggestions.length === 0 ? (
        <p className="text-gray-500 text-sm">No suggestions available</p>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-md shadow-sm border"
            >
              {suggestion.title && (
                <p className="font-medium">{suggestion.title}</p>
              )}
              {suggestion.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {suggestion.description}
                </p>
              )}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => onSuggestionApplied(suggestion)}
                  className="text-xs bg-primary text-white px-2 py-1 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
