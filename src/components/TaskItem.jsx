import React from "react";

export default function TaskItem({ task, onEdit, onDelete, onReview }) {
  return (
    <div className="task-item">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task)}>✏️ Редактировать</button>
      <button onClick={() => onDelete(task.id)}>🗑 Удалить</button>
      <button onClick={() => onReview(task)}>✅ Проверить ответы</button>
    </div>
  );
}
