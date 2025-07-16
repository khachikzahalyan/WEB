import "./TaskItem.css";

export default function TaskItem({ task, onEdit, onDelete, onReview }) {
  const createdAtDate = task.createdAt ? (task.createdAt.toDate ? task.createdAt.toDate() : new Date(task.createdAt)) : null;

  // Рассчитаем дату дедлайна, если есть deadlineInDays
  let deadlineDate = null;
  if (createdAtDate && task.deadlineInDays) {
    deadlineDate = new Date(createdAtDate);
    deadlineDate.setDate(deadlineDate.getDate() + task.deadlineInDays);
  }

  return (
    <div className="task-item-card">
      <h4 className="task-item-title">{task.title}</h4>
      <p className="task-item-description">{task.description}</p>

      {createdAtDate && (
        <p className="task-item-created-at">
          Ավելացված է՝ {createdAtDate.toLocaleDateString("hy-AM")}
        </p>
      )}

      {deadlineDate && (
        <p className="task-item-deadline">
          Վերջնաժամկետ՝ {deadlineDate.toLocaleDateString("hy-AM")}
        </p>
      )}

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
