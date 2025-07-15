import React, { useState, useEffect } from "react";

export default function StudentTaskItem({ task, studentUsername, onSubmitAnswer }) {
  const existingAnswer = task.answers?.find(ans => ans.student === studentUsername);

  const [text, setText] = useState(existingAnswer?.text || "");
  const [file, setFile] = useState(existingAnswer?.file || null);
  const [isSubmitted, setIsSubmitted] = useState(!!existingAnswer);

  useEffect(() => {
    if (existingAnswer) {
      setText(existingAnswer.text);
      setFile(existingAnswer.file);
      setIsSubmitted(true);
    }
  }, [existingAnswer]);

  const handleFileChange = e => {
    if (isSubmitted) return; // блокируем изменение файла после отправки

    const selected = e.target.files[0];
    if (selected) {
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || isSubmitted) return;
    onSubmitAnswer(task.id, {
      student: studentUsername,
      text,
      file,
      checked: false,
      comments: [],
      grade: null
    });
    setIsSubmitted(true);
  };

  return (
    <div className="task-item student-task">
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      {isSubmitted ? (
        <div className="answer-view">
          <h5>📩 Ваш ответ:</h5>
          <pre>{text}</pre>
          {file && (
            <div>
              <a href={file} target="_blank" rel="noopener noreferrer">
                📎 Открыть прикреплённый файл
              </a>
            </div>
          )}
          {existingAnswer.checked && (
            <div className="teacher-feedback">
              <h5>📝 Комментарии учителя:</h5>
              {existingAnswer.comments.map((c, i) => (
                <p key={i}>Строка {c.line}: {c.comment}</p>
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
