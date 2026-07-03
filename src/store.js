let tasks = [];
let nextId = 1;

export function getTasks() {
  return [...tasks];
}

export function createTask(title) {
  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTask(id, patch) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  const idx = tasks.indexOf(task);
  tasks[idx] = { ...task, ...patch };
  return tasks[idx];
}

// MISSING FEATURE: export function deleteTask(id) — not implemented
// Tests expect DELETE /api/tasks/:id (applicant adds route + function)

export function _resetForTests() {
  tasks = [];
  nextId = 1;
}
