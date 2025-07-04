const API_BASE_URL = "http://localhost:8000/web/api";

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Task API
export async function fetchTasks() {
  return fetchJson(`${API_BASE_URL}/todo/GetTask`);
}

export async function createTask(task) {
  return fetchJson(`${API_BASE_URL}/todo/CreateTask`, {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export async function updateTask(task) {
  return fetchJson(`${API_BASE_URL}/todo/UpdateTask`, {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export async function deleteTask(taskId) {
  await fetchJson(`${API_BASE_URL}/todo/DelTask`, {
    method: "POST",
    body: JSON.stringify({ taskId: taskId }),
  });
}

// Context API
export async function addContext(context) {
  return fetchJson(`${API_BASE_URL}/context`, {
    method: "POST",
    body: JSON.stringify(context),
  });
}

export async function getContextHistory() {
  return fetchJson(`${API_BASE_URL}/context`);
}

// AI API
export async function getAITaskSuggestions(currentTask) {
  return fetchJson(`${API_BASE_URL}/ai/suggestions`, {
    method: "POST",
    body: JSON.stringify(currentTask),
  });
}

export async function fetchCategories() {
  return fetch(`${API_BASE_URL}/todo/GetCategory`).then((res) => res.json());
}

export async function createCategory(name) {
  return fetch(`${API_BASE_URL}/todo/CreateCategory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: name }),
  }).then((res) => res.json());
}
