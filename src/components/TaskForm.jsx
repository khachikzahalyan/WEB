// components/TaskForm.jsx
import React from "react";

export default function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  isEdit
}) {
  return (
    <div className="task-form">
      <h3>{isEdit ? "Редактировать задание" : "Новое задание"}</h3>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Описание задания"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={onSubmit}>
        {isEdit ? "Сохранить изменения" : "Добавить задание"}
      </button>
    </div>
  );
}
