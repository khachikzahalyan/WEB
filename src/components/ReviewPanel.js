import React, { useState, useEffect } from "react";

export default function ReviewPanel({ task, onSave, onCancel }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [comments, setComments] = useState([]); // {line: number, comment: string}
  const [grade, setGrade] = useState("");
  const [lines, setLines] = useState([]);

  // При смене выбранного ученика подгружаем ответ и комментарии
  useEffect(() => {
    if (!selectedStudent) {
      setAnswerText("");
      setComments([]);
      setGrade("");
      setLines([]);
      return;
    }

    const ans = task.answers.find(a => a.student === selectedStudent);
    if (ans) {
      setAnswerText(ans.text);
      setComments(ans.comments || []);
      setGrade(ans.grade || "");
      setLines(ans.text ? ans.text.split("\n") : []);
    } else {
      setAnswerText("");
      setComments([]);
      setGrade("");
      setLines([]);
    }
  }, [selectedStudent, task]);

  // Обновить комментарий по строке
  const handleCommentChange = (lineNum, value) => {
    setComments(prev => {
      const other = prev.filter(c => c.line !== lineNum);
      if (value.trim() === "") return other;
      return [...other, { line: lineNum, comment: value }];
    });
  };

  const handleSave = () => {
    if (!selectedStudent) return alert("Выберите ученика");

    const updatedAnswers = task.answers.map(ans => {
      if (ans.student === selectedStudent) {
        return {
          ...ans,
          checked: true,
          comments,
          grade,
          text: answerText
        };
      }
      return ans;
    });

    onSave(task.id, updatedAnswers);
  };

  return (
    <div className="review-panel">
      <h3>Проверка задания: {task.title}</h3>

      <label>
        Выберите ученика:
        <select
          value={selectedStudent || ""}
          onChange={e => setSelectedStudent(e.target.value)}
        >
          <option value="" disabled>-- выбрать --</option>
          {task.answers.map(ans => (
            <option key={ans.student} value={ans.student}>
              {ans.student}
            </option>
          ))}
        </select>
      </label>

      {selectedStudent && (
        <div className="review-content">
          <h4>Ответ ученика:</h4>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "10px" }}>
            {answerText}
          </pre>

          <h4>Комментарии по строкам:</h4>
          {lines.map((lineText, idx) => {
            const lineNum = idx + 1;
            const commentObj = comments.find(c => c.line === lineNum);
            return (
              <div key={lineNum} style={{ marginBottom: "8px" }}>
                <div><strong>Строка {lineNum}:</strong> {lineText}</div>
                <textarea
                  placeholder="Комментарий"
                  value={commentObj ? commentObj.comment : ""}
                  onChange={e => handleCommentChange(lineNum, e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            );
          })}

          <div>
            <label>
              Оценка:
              <select value={grade} onChange={e => setGrade(e.target.value)}>
                <option value="">-- выбрать --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </label>
          </div>

          <button onClick={handleSave}>Сохранить проверку</button>
          <button onClick={onCancel} style={{ marginLeft: "10px" }}>Отмена</button>
        </div>
      )}
    </div>
  );
}
