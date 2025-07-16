import React, { useState, useEffect } from "react";
import "./ReviewPanel.css";

export default function ReviewPanel({ task, onSave, onCancel }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [comments, setComments] = useState([]);
  const [grade, setGrade] = useState("");
  const [lines, setLines] = useState([]);
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [fileName, setFileName] = useState("");

  
  useEffect(() => {
    if (!selectedStudent) {
      setAnswerText("");
      setComments([]);
      setGrade("");
      setLines([]);
      setFileDataUrl("");
      setFileName("");
      return;
    }

    const ans = task.answers.find(a => a.student === selectedStudent);
    if (ans) {
      setAnswerText(ans.text);
      setComments(ans.comments || []);
      setGrade(ans.grade || "");
      setLines(ans.text ? ans.text.split("\n") : []);
      setFileDataUrl(ans.fileDataUrl || "");
      setFileName(ans.fileName || "");
    } else {
      setAnswerText("");
      setComments([]);
      setGrade("");
      setLines([]);
      setFileDataUrl("");
      setFileName("");
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
          text: answerText,
          fileDataUrl,
          fileName,
        };
      }
      return ans;
    });

    onSave(task.id, updatedAnswers);
  };

  return (
    <div className="review-panel-wrapper">
      <h3 className="review-panel-title">Առաջադրանքի ստուգում: {task.title}</h3>

      <label className="review-panel-label">
        Ընտրեք ուսանողին:
        <select
          className="review-panel-select"
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
        <div className="review-panel-content">
          <h4 className="review-panel-subtitle">Ուսանողի պատասխանները:</h4>
          <pre className="review-panel-answer-text">{answerText}</pre>

          
          {fileDataUrl && (
            <div className="review-panel-file">
              <a href={fileDataUrl} download={fileName}>
                📎 Ներբեռնել {fileName}
              </a>
            </div>
          )}

          <h4 className="review-panel-subtitle">Մեկնաբանություններ տողերի համար:</h4>
          {lines.map((lineText, idx) => {
            const lineNum = idx + 1;
            const commentObj = comments.find(c => c.line === lineNum);
            return (
              <div key={lineNum} className="review-panel-line-block">
                <div><strong>Տող :</strong> {lineText}</div>
                <textarea
                  className="review-panel-comment"
                  placeholder="Մեկնաբանություն"
                  value={commentObj ? commentObj.comment : ""}
                  onChange={e => handleCommentChange(lineNum, e.target.value)}
                />
              </div>
            );
          })}

          <div className="review-panel-grade-block">
            <label className="review-panel-label">
              Գնահատական:
              <select
                className="review-panel-select"
                value={grade}
                onChange={e => setGrade(e.target.value)}
              >
                <option value="">-- ընտրել --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </label>
          </div>

          <div className="review-panel-buttons">
            <button className="review-btn save" onClick={handleSave}>Պահպանել ստուգումը</button>
            <button className="review-btn cancel" onClick={onCancel}>Չեղարկել</button>
          </div>
        </div>
      )}
    </div>
  );
}
