import { useState, useEffect } from "react";
import "./StudentTaskItem.css";

// Форматируем timestamp (Firebase Timestamp или Date)
function formatDate(timestamp) {
  if (!timestamp) return "-";
  const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return dateObj.toLocaleDateString("hy-AM", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default function StudentTaskItem({ task, studentUsername, onSubmitAnswer }) {
  const existingAnswer = task.answers?.find(ans => ans.student === studentUsername);

  const [text, setText] = useState(existingAnswer?.text || "");
  const [fileDataUrl, setFileDataUrl] = useState(existingAnswer?.fileDataUrl || "");
  const [fileName, setFileName] = useState(existingAnswer?.fileName || "");
  const [isSubmitted, setIsSubmitted] = useState(!!existingAnswer);

  useEffect(() => {
    if (existingAnswer) {
      setText(existingAnswer.text);
      setFileDataUrl(existingAnswer.fileDataUrl || "");
      setFileName(existingAnswer.fileName || "");
      setIsSubmitted(true);
    }
  }, [existingAnswer]);

  const handleFileChange = e => {
    if (isSubmitted) return;
    const selected = e.target.files[0];
    if (selected) {
      setFileName(selected.name);

      const reader = new FileReader();
      reader.onload = () => setFileDataUrl(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() || isSubmitted) return;

    await onSubmitAnswer(task.id, {
      student: studentUsername,
      text,
      fileDataUrl: fileDataUrl || "",
      fileName,
      checked: false,
      comments: [],
      grade: null
    });

    setIsSubmitted(true);
  };

  // Вычисляем дату создания задания
  const createdAtDate = task.createdAt ? (task.createdAt.toDate ? task.createdAt.toDate() : new Date(task.createdAt)) : null;

  // Вычисляем дедлайн, прибавляя к createdAt deadlineInDays
  let deadlineDate = null;
  if (createdAtDate && task.deadlineInDays) {
    deadlineDate = new Date(createdAtDate);
    deadlineDate.setDate(deadlineDate.getDate() + task.deadlineInDays);
  }

  return (
    <div className="student-task-card">
      <h4 className="student-task-title">{task.title}</h4>
      <p className="student-task-desc">{task.description}</p>

      {/* Дата добавления */}
      {createdAtDate && (
        <p className="student-task-createdAt">Ավելացված է՝ {formatDate(createdAtDate)}</p>
      )}

      {/* Дедлайн */}
      {deadlineDate && (
        <p className="student-task-deadline">Վերջնաժամկետ՝ {formatDate(deadlineDate)}</p>
      )}

      {isSubmitted ? (
        <div className="student-answer-view">
          <h5 className="student-answer-heading">📩 Ձեր պատասխանը</h5>
          <pre className="student-answer-text">{text}</pre>

          {fileDataUrl && (
            <div className="student-answer-file">
              <a href={fileDataUrl} download={fileName}>
                📎 Ներբեռնել {fileName}
              </a>
            </div>
          )}

          {existingAnswer.checked && (
            <div className="student-teacher-feedback">
              <h5>📝 Ուսուցչի մեկնաբանությունները</h5>
              {existingAnswer.comments.map((c, i) => (
                <p key={i}>մեկնաբանություն : {c.comment}</p>
              ))}
              <p>🏁 Գնահատական՝ <strong>{existingAnswer.grade}</strong></p>
            </div>
          )}
        </div>
      ) : (
        <div className="student-answer-form">
          <textarea
            className="student-answer-textarea"
            placeholder="Ձեր պատասխանը․․․"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input
            className="student-answer-fileinput"
            type="file"
            onChange={handleFileChange}
            disabled={isSubmitted}
          />
          <button className="student-answer-submit" onClick={handleSubmit}>Ուղարկել</button>
        </div>
      )}
    </div>
  );
}
