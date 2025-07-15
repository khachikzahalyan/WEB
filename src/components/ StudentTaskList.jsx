
import StudentTaskItem from "./StudentTaskItem";

export default function StudentTaskList({ tasks, studentUsername, onSubmitAnswer }) {
  return (
    <div className="task-list student-list">
      <h3>📚 Задания</h3>
      {tasks.length === 0 ? (
        <p>Пока нет заданий</p>
      ) : (
        tasks.map(task => (
          <StudentTaskItem
            key={task.id}
            task={task}
            studentUsername={studentUsername}
            onSubmitAnswer={onSubmitAnswer}
          />
        ))
      )}
    </div>
  );
}
