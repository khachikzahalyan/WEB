import React, { useState, useEffect } from "react";
import { getUser, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../../firebase";
import StudentTaskList from "../../components/ StudentTaskList";
import "./student.css";

export default function Student() {
  const user = getUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // 🔁 Подписка на задачи в Firestore
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
    <div className="student-container">
      <h2>👩‍🎓 Панель Ученика</h2>
      <p>Добро пожаловать, {user?.username}</p>
      <button onClick={handleLogout}>Выйти</button>

      <StudentTaskList
        tasks={tasks}
        studentUsername={user.username}
        onSubmitAnswer={handleAnswerSubmit}
      />
    </div>
  );
}
