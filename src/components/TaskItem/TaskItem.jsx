import "./TaskItem.css"

export default function TaskItem({ task, onEdit, onDelete, onReview }) {
  return (
    <div className="task-item-card">
      <h4 className="task-item-title">{task.title}</h4>
      <p className="task-item-description">{task.description}</p>
      <div className="task-item-actions">
        <button className="task-btn edit-btn" onClick={() => onEdit(task)}>
          ✏️ Խմբագրել
        </button>
        <button className="task-btn delete-btn" onClick={() => onDelete(task.id)}>
          🗑 Հեռացնել
        </button>
        <button className="task-btn review-btn" onClick={() => onReview(task)}>
          ✅ Պատասխանները ստուգել
        </button>
      </div>
    </div>
  );
}
