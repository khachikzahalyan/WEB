import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onReview }) {
  return (
    <div className="task-list">
      <h3>Առաջադրանքների Ցուցակ</h3>
      {tasks.length === 0 ? (
        <p>Առաջադրանքներ դեռ չկան</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onReview={onReview}
          />
        ))
      )}
    </div>
  );
}
