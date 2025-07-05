"use client";
import { useState } from "react";
import { createTask } from "../lib/api";
import CategorySelector from "./ui/CategorySelector";

export default function AddTaskModal({ isOpen, onClose, onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
    category: "",
    context: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTask, setSubmittedTask] = useState(null);
  const [aiSuggestions, setAISuggestions] = useState(null);
  const [showSuggestionsAfterSubmit, setShowSuggestionsAfterSubmit] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newTask = await createTask(task);
      onTaskAdded(newTask);
      setSubmittedTask(newTask);
      setAISuggestions({
        enhancedDescription: newTask.enhanced_description,
        priorityScore: newTask.priority_score,
        suggestedDeadline: newTask.suggested_deadline,
        suggestedCategory: newTask.suggested_category,
      });
      setShowSuggestionsAfterSubmit(true);
      setTask({
        title: "",
        description: "",
        completed: false,
        category: "",
        context: "",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowSuggestionsAfterSubmit(false);
    setAISuggestions(null);
    setSubmittedTask(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {showSuggestionsAfterSubmit
                ? "🤖 AI Suggestions"
                : "📝 Add New Task"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* FORM or SUGGESTIONS */}
          {!showSuggestionsAfterSubmit ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-100"
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Description
                </label>
                <textarea
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-100"
                  placeholder="Optional task details..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Context (e.g. notes, email, messages)
                </label>
                <textarea
                  value={task.context}
                  onChange={(e) =>
                    setTask({ ...task, context: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-100"
                  placeholder="Paste or type relevant context..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Category
                </label>
                <CategorySelector
                  value={task.category}
                  onChange={(category) => setTask({ ...task, category })}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Task"}
                </button>
              </div>
            </form>
          ) : (
            // AI SUGGESTIONS SECTION
            <div className="space-y-4 bg-gray-50 rounded-xl p-4 border text-sm text-gray-700 overflow-hidden">
              <div>
                <p className="font-medium text-gray-800">
                  ✨ Enhanced Description:
                </p>
                <p className="text-gray-600 mt-1 italic">
                  {aiSuggestions.enhancedDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-xl p-4 shadow-sm">
                  <p className="font-medium text-gray-800">📌 Priority Score</p>
                  <p className="text-blue-700 font-bold text-xl mt-1">
                    {aiSuggestions.priorityScore}/10
                  </p>
                </div>

                <div className="bg-white border rounded-xl p-4 shadow-sm">
                  <p className="font-medium text-gray-800">
                    🏷 Suggested Category
                  </p>
                  <p className="text-blue-700 font-semibold mt-1 capitalize">
                    {aiSuggestions.suggestedCategory}
                  </p>
                </div>

                <div className="bg-white border rounded-xl p-4 shadow-sm">
                  <p className="font-medium text-gray-800">
                    🗓 Suggested Deadline
                  </p>
                  <p className="text-blue-700 mt-1">
                    {new Date(aiSuggestions.suggestedDeadline).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Button to close */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
