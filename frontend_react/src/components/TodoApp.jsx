import React, { useEffect, useMemo, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { CATEGORY_OPTIONS, LOCAL_STORAGE_KEY, createEmptyTask, upsertTask } from '../utils/tasks';

// PUBLIC_INTERFACE
export default function TodoApp() {
  /**
   * TodoApp is the main container that manages task state, persistence, and filtering.
   * - Loads tasks from LocalStorage on mount
   * - Persists tasks to LocalStorage whenever they change
   * - Supports add, edit, delete, toggle complete
   * - Supports filtering by category
   */

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null); // task being edited or null

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      }
    } catch {
      // ignore parse errors and start fresh
      setTasks([]);
    }
  }, []);

  // Persist to LocalStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'All') return tasks;
    return tasks.filter(t => t.category === filter);
  }, [tasks, filter]);

  const handleAdd = (task) => {
    setTasks(prev => [...prev, { ...task, id: crypto.randomUUID(), completed: false }]);
  };

  const handleUpdate = (updated) => {
    setTasks(prev => upsertTask(prev, updated));
    setEditing(null);
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const startEdit = (task) => {
    setEditing(task);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="title">
            <span className="dot" />
            Minimalist To‑Do
          </div>
          <div className="controls">
            <select
              className="select filter"
              aria-label="Filter by category"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {['All', ...CATEGORY_OPTIONS].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card section" aria-label="Task form">
          <TaskForm
            key={editing ? editing.id : 'new'}
            initialTask={editing ? editing : createEmptyTask()}
            onSubmit={editing ? handleUpdate : handleAdd}
            onCancel={editing ? cancelEdit : undefined}
            submitLabel={editing ? 'Update Task' : 'Add Task'}
          />
        </div>

        <div className="card list" aria-label="Task list">
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={startEdit}
          />
          {filteredTasks.length === 0 && (
            <div className="empty">
              {tasks.length === 0
                ? 'No tasks yet. Add your first task above.'
                : 'No tasks match this filter.'}
            </div>
          )}
          <div className="footer">
            <span>{tasks.filter(t => !t.completed).length} pending</span>
            <span>{tasks.filter(t => t.completed).length} completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
