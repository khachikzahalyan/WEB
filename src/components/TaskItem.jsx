import React from "react";

export default function TaskItem({ task, onEdit, onDelete, onReview }) {
  return (
    <div className="task-item">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task)}>✏️ Խմբագրել</button>
      <button onClick={() => onDelete(task.id)}>🗑 Հեռացնել</button>
      <button onClick={() => onReview(task)}>✅ Պատասխանները ստուգել</button>
    </div>
  );
}
