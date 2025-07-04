"use client";

import { useState } from "react";
import { addContext } from "../lib/api";

export default function ContextPage() {
  const [context, setContext] = useState({
    content: "",
    sourceType: "note",
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addContext(context);
      setContext({
        content: "",
        sourceType: "note",
        date: new Date().toISOString().split("T")[0],
      });
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to add context:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Add Daily Context</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <div>
          <label
            htmlFor="sourceType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Source Type
          </label>
          <select
            id="sourceType"
            value={context.sourceType}
            onChange={(e) =>
              setContext({ ...context, sourceType: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="note">Note</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={context.date}
            onChange={(e) => setContext({ ...context, date: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content *
          </label>
          <textarea
            id="content"
            value={context.content}
            onChange={(e) =>
              setContext({ ...context, content: e.target.value })
            }
            className="w-full p-2 border rounded-md"
            rows={6}
            required
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          {submissionSuccess && (
            <p className="text-green-600 text-sm">
              Context added successfully!
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !context.content}
            className="ml-auto px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Context"}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Context History</h3>
        <p className="text-gray-500">Context history will be displayed here</p>
      </div>
    </div>
  );
}
