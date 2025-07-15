import React, { useState, useEffect } from "react";
import { getUser, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import StudentTaskList from "../../components/StudentTaskList";
import "./student.css";

export default function Student() {
  const user = getUser();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const handleAnswerSubmit = (taskId, answer) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, answers: [...task.answers, answer] };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="stu-panel-container">
      <h2 className="stu-panel-title">👩‍🎓 Ուսանող</h2>
      <p className="stu-welcome-text">Բարի գալուստ, {user?.username}</p>
      <button className="stu-logout-btn" onClick={handleLogout}>Ելք</button>

      <StudentTaskList
        tasks={tasks}
        studentUsername={user.username}
        onSubmitAnswer={handleAnswerSubmit}
      />
    </div>
  );
}
