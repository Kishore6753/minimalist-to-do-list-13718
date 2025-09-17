import React from 'react';

/**
 * TaskItem renders a single task row with:
 * - checkbox to toggle completion
 * - title and category pill
 * - deadline
 * - edit and delete buttons
 * Props:
 * - task
 * - onToggle()
 * - onEdit()
 * - onDelete()
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const catClass =
    task.category === 'Work' ? 'work' :
    task.category === 'Study' ? 'study' : 'personal';

  const deadlineText = task.deadline ? new Date(task.deadline + 'T00:00:00').toLocaleDateString() : 'No deadline';

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`} role="listitem" aria-label={`Task ${task.title}`}>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />
      <div className="task-main">
        <div className="task-title">
          <span>{task.title}</span>
          <span className={`pill ${catClass}`}>{task.category}</span>
        </div>
        <div className="task-meta">Due: {deadlineText}</div>
      </div>
      <div className="task-actions">
        <button className="icon-btn" onClick={onEdit} aria-label="Edit task" title="Edit">
          <span className="icon edit">✏️</span>
        </button>
        <button className="icon-btn" onClick={onDelete} aria-label="Delete task" title="Delete">
          <span className="icon delete">🗑️</span>
        </button>
      </div>
    </div>
  );
}
