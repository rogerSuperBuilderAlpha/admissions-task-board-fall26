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

export function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const [removed] = tasks.splice(idx, 1);
  return removed;
}

export function _resetForTests() {
  tasks = [];
  nextId = 1;
}
