import React, { useState, useEffect } from "react";

export default function ReviewPanel({ task, onSave, onCancel }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [comments, setComments] = useState([]);
  const [grade, setGrade] = useState("");
  const [lines, setLines] = useState([]);

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

  const handleCommentChange = (lineNum, value) => {
    setComments(prev => {
      const other = prev.filter(c => c.line !== lineNum);
      if (value.trim() === "") return other;
      return [...other, { line: lineNum, comment: value }];
    });
  };

  const handleSave = () => {
    if (!selectedStudent) return alert("Ընտրեք ուսանողին");

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
      <h3>Առաջադրանքի ստուգում: {task.title}</h3>

      <label>
        Ընտրեք ուսանողին:
        <select
          value={selectedStudent || ""}
          onChange={e => setSelectedStudent(e.target.value)}
        >
          <option value="" disabled>-- ընտրել --</option>
          {task.answers.map(ans => (
            <option key={ans.student} value={ans.student}>
              {ans.student}
            </option>
          ))}
        </select>
      </label>

      {selectedStudent && (
        <div className="review-content">
          <h4>Ուսանողի պատասխանները:</h4>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "10px" }}>
            {answerText}
          </pre>

          <h4>Մեկնաբանություններ տողերի համար:</h4>
          {lines.map((lineText, idx) => {
            const lineNum = idx + 1;
            const commentObj = comments.find(c => c.line === lineNum);
            return (
              <div key={lineNum} style={{ marginBottom: "8px" }}>
                <div><strong>Տող {lineNum}:</strong> {lineText}</div>
                <textarea
                  placeholder="Մեկնաբանություն"
                  value={commentObj ? commentObj.comment : ""}
                  onChange={e => handleCommentChange(lineNum, e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            );
          })}

          <div>
            <label>
              Գնահատական:
              <select value={grade} onChange={e => setGrade(e.target.value)}>
                <option value="">-- ընտրել --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </label>
          </div>

          <button onClick={handleSave}>Պահպանել ստուգումը</button>
          <button onClick={onCancel} style={{ marginLeft: "10px" }}>Չեղարկել</button>
        </div>
      )}
    </div>
  );
}
