import React from 'react';
import TaskItem from './TaskItem';

/**
 * TaskList renders a list of TaskItem components.
 * Props:
 * - tasks: array of task objects
 * - onToggle(id)
 * - onDelete(id)
 * - onEdit(task)
 */
export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </div>
  );
}
