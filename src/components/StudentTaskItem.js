import React, { useState } from "react";

export default function StudentTaskItem({ task, studentUsername, onSubmitAnswer }) {
  const existingAnswer = task.answers.find(ans => ans.student === studentUsername);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = e => {
    const selected = e.target.files[0];
    if (selected) {
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmitAnswer(task.id, {
      student: studentUsername,
      text,
      file,
      checked: false,
      comments: [],
      grade: null
    });
    setText("");
    setFile(null);
  };

  return (
    <div className="task-item student-task">
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      {existingAnswer ? (
        <div className="answer-view">
          <h5>📩 Ваш ответ:</h5>
          <p>{existingAnswer.text}</p>
          {existingAnswer.file && (
            <div>
              <a href={existingAnswer.file} target="_blank" rel="noopener noreferrer">
                📎 Открыть прикреплённый файл
              </a>
            </div>
          )}
          {existingAnswer.checked && (
            <div className="teacher-feedback">
              <h5>📝 Комментарии учителя:</h5>
              {existingAnswer.comments.map((c, i) => (
                <p key={i}>💬 {c.comment}</p>
              ))}
              <p>🏁 Оценка: <strong>{existingAnswer.grade}</strong></p>
            </div>
          )}
        </div>
      ) : (
        <div className="answer-form">
          <textarea
            placeholder="Ваш ответ..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleSubmit}>Отправить</button>
        </div>
      )}
    </div>
  );
}
