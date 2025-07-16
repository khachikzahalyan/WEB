import TaskItem from "../TaskItem/TaskItem";


export default function TaskList({ tasks, onEdit, onDelete, onReview }) {
  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <p>Առաջադրանքներ չկան</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
            onReview={() => onReview(task)}
          />
        ))
      )}
    </div>
  );
}
