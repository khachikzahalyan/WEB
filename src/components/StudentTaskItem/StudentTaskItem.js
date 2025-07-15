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
    if (isSubmitted) return;

    const selected = e.target.files[0];
    if (selected) {
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() || isSubmitted) return;
    await onSubmitAnswer(task.id, {
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
          <h5>📩 Ձեր պատասխանը</h5>
          <pre>{text}</pre>
          {file && (
            <div>
              <a href={file} target="_blank" rel="noopener noreferrer">
                📎 Բացել կցված ֆայլը
              </a>
            </div>
          )}
          {existingAnswer.checked && (
            <div className="teacher-feedback">
              <h5>📝 Ուսուցչի մեկնաբանությունները</h5>
              {existingAnswer.comments.map((c, i) => (
                <p key={i}>Տող {c.line}: {c.comment}</p>
              ))}
              <p>🏁 Գնահատական՝ <strong>{existingAnswer.grade}</strong></p>
            </div>
          )}
        </div>
      ) : (
        <div className="answer-form">
          <textarea
            placeholder="Ձեր պատասխանը․․․"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleSubmit}>Ուղարկել</button>
        </div>
      )}
    </div>
  );
}
