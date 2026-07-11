let tasks = [];
let nextId = 1;

export function getTasks() {
  // BUG 1: returns internal reference — mutations leak; also forgets to sort by id
  return tasks
    .map(task => ({ ...task }))
    .sort((a, b) => a.id - b.id);
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
  // BUG 2: rebuilds from patch only — drops title when patching { completed: true }
  tasks[idx] = { ...task, ...patch };
  return tasks[idx];
}

export function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const [deletedTask] = tasks.splice(idx, 1);
  return deletedTask;
}

export function _resetForTests() {
  tasks = [];
  nextId = 1;
}
