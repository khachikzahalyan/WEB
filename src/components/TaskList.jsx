import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onReview }) {
  return (
    <div className="task-list">
      <h3>Список заданий</h3>
      {tasks.length === 0 ? (
        <p>Пока заданий нет</p>
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
