"use client";

import { useState, useEffect } from "react";
import { fetchTasks } from "./lib/api";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [reload]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.Status === "pending";
    if (filter === "complete") return task.Status === "complete";
    return true;
  });

  const handleTaskAdded = (newTask) => {
    setReload((prev) => !prev);
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setReload((prev) => !prev);
    setTasks(
      tasks.map((task) =>
        task.TaskID === updatedTask.TaskID ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setReload((prev) => !prev);
    setTasks(tasks.filter((task) => task.TaskID !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            🧠 Smart Task Dashboard
          </h1>

          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-gray-300 text-sm px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="complete">Completed</option>
            </select>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md shadow-md"
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Task List or Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-400 border-t-transparent"></div>
          </div>
        ) : filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        ) : (
          <div className="text-center text-gray-500 mt-20 text-lg">
            No tasks found for selected filter.
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
}
