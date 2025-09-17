import React, { useEffect, useState } from 'react';
import { CATEGORY_OPTIONS, isValidTaskInput } from '../utils/tasks';

/**
 * TaskForm is used for both creation and editing of tasks.
 * Props:
 * - initialTask: { id?, title, category, deadline, completed? }
 * - onSubmit: function(task)
 * - onCancel?: function()
 * - submitLabel?: string
 */
export default function TaskForm({ initialTask, onSubmit, onCancel, submitLabel = 'Add Task' }) {
  const [title, setTitle] = useState(initialTask.title || '');
  const [category, setCategory] = useState(initialTask.category || CATEGORY_OPTIONS[0]);
  const [deadline, setDeadline] = useState(initialTask.deadline || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initialTask.title || '');
    setCategory(initialTask.category || CATEGORY_OPTIONS[0]);
    setDeadline(initialTask.deadline || '');
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidate = { ...initialTask, title: title.trim(), category, deadline };
    const validation = isValidTaskInput(candidate);
    if (!validation.ok) {
      setError(validation.message);
      return;
    }
    setError('');
    onSubmit(candidate);
    if (!initialTask?.id) {
      // if creating, clear form
      setTitle('');
      setCategory(CATEGORY_OPTIONS[0]);
      setDeadline('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="inline" role="form">
      <input
        aria-label="Task title"
        className="input"
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        aria-label="Task category"
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORY_OPTIONS.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <input
        aria-label="Task deadline"
        className="date"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit" className="btn primary">
        {submitLabel}
      </button>
      {onCancel && (
        <button type="button" className="btn" onClick={onCancel} aria-label="Cancel editing">
          Cancel
        </button>
      )}
      {error && <div role="alert" style={{ color: '#ff8787', fontSize: 12 }}>{error}</div>}
    </form>
  );
}
