let tasks = [];
let nextId = 1;

function copyTask(task) {
  return { ...task };
}

export function getTasks() {
  return tasks.toSorted((a, b) => a.id - b.id).map(copyTask);
}

export function createTask(title) {
  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return copyTask(task);
}

export function updateTask(id, patch) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  const idx = tasks.indexOf(task);
  tasks[idx] = { ...task, ...patch, id };
  return copyTask(tasks[idx]);
}

export function deleteTask(id) {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return null;
  const [deleted] = tasks.splice(idx, 1);
  return copyTask(deleted);
}

export function _resetForTests() {
  tasks = [];
  nextId = 1;
}
