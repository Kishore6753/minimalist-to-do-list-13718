export const LOCAL_STORAGE_KEY = 'todo_tasks_v1';
export const CATEGORY_OPTIONS = ['Work', 'Study', 'Personal'];

/**
 * PUBLIC_INTERFACE
 * Creates an empty task object (without id) for form initialization.
 */
export function createEmptyTask() {
  return {
    title: '',
    category: CATEGORY_OPTIONS[0],
    deadline: ''
  };
}

/**
 * PUBLIC_INTERFACE
 * Upserts a task by id into the list (replace if id exists, else push).
 * Returns a new array (immutable update).
 */
export function upsertTask(list, task) {
  const idx = list.findIndex(t => t.id === task.id);
  if (idx === -1) return [...list, task];
  const next = list.slice();
  next[idx] = { ...list[idx], ...task };
  return next;
}

/**
 * PUBLIC_INTERFACE
 * Validates user inputs for a task object (title, category, deadline).
 */
export function isValidTaskInput(task) {
  if (!task.title || !task.title.trim()) {
    return { ok: false, message: 'Title cannot be empty.' };
  }
  if (!CATEGORY_OPTIONS.includes(task.category)) {
    return { ok: false, message: 'Invalid category.' };
  }
  if (task.deadline) {
    // basic YYYY-MM-DD check
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(task.deadline);
    if (!valid) {
      return { ok: false, message: 'Invalid date format.' };
    }
  }
  return { ok: true, message: '' };
}
