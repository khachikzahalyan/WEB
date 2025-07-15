import React, { useState, useEffect } from "react";
import { getUser, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import StudentTaskList from "../../components/StudentTaskList";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../../firebase";
import "./student.css";

export default function Student() {
  const user = getUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskData);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

 
  const handleAnswerSubmit = async (taskId, answer) => {
    const taskRef = doc(db, "tasks", taskId);
    const task = tasks.find((t) => t.id === taskId);
    const updatedAnswers = [...(task.answers || []), answer];

    await updateDoc(taskRef, {
      answers: updatedAnswers
    });
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
