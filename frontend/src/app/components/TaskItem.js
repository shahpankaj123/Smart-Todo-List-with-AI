"use client";

import { useState } from "react";
import { FiEdit, FiTrash2, FiClock } from "react-icons/fi";
import PriorityBadge from "./ui/PriorityBadge";
import { updateTask, deleteTask } from "../lib/api";

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedTask = await updateTask(editedTask);
      onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.TaskID); // ✅ Fix TaskID typo
      onTaskDeleted(task.TaskID);
    } catch (error) {
      console.error("Failed to delete task:", error);
      setIsDeleting(false);
    }
  };

  const toggleComplete = async () => {
    const updated = {
      ...task,
      Status: task.Status === "pending" ? "complete" : "pending",
    };
    try {
      const updatedTask = await updateTask(updated);
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 ${
        task.Status === "complete" ? "opacity-70" : ""
      }`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTask.Title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, Title: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
          <textarea
            value={editedTask.Desc}
            onChange={(e) =>
              setEditedTask({ ...editedTask, Desc: e.target.value })
            }
            className="w-full p-2 border rounded-md"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 border rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.Status === "complete"}
                onChange={toggleComplete}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <h3
                className={`text-lg font-medium ${
                  task.Status === "complete" ? "line-through" : ""
                }`}
              >
                {task.Title}
              </h3>
              <PriorityBadge priority={task.PriorityScore} />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-blue-600"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-gray-500 hover:text-red-500"
              >
                {isDeleting ? "Deleting..." : <FiTrash2 size={18} />}
              </button>
            </div>
          </div>

          {task.Desc && (
            <p
              className={`text-gray-600 ${
                task.Status === "complete" ? "line-through" : ""
              }`}
            >
              <span className="text-red-500">Description</span> : {task.Desc}
            </p>
          )}
          {task.AIDesc && (
            <p
              className={`text-gray-600 ${
                task.Status === "complete" ? "line-through" : ""
              }`}
            >
              <span className="text-green-500">AI Adviced</span> : {task.AIDesc}
            </p>
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
            {task.DeadLine && (
              <div className="flex items-center">
                <FiClock className="mr-1" />
                <span>
                  {new Date(task.DeadLine).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            {task.Category && typeof task.Category === "string" && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                {task.Category}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
