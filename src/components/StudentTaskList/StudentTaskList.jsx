import StudentTaskItem from "../StudentTaskItem/StudentTaskItem";

export default function StudentTaskList({ tasks, studentUsername, onSubmitAnswer }) {
  return (
    <div className="student-tasklist">
      <h3>📚 Առաջադրանքներ</h3>
      {tasks.length === 0 ? (
        <p>Առաջադրանքներ դեռ չկան</p>
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
