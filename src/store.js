let tasks = [];
let nextId = 1;

export function getTasks() {
  // Return a sorted copy so callers can't mutate the internal array.
  return [...tasks].sort((a, b) => a.id - b.id);
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
  // Merge the patch onto the existing task so untouched fields are preserved.
  tasks[idx] = { ...task, ...patch, id: task.id };
  return tasks[idx];
}

export function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

export function _resetForTests() {
  tasks = [];
  nextId = 1;
}
