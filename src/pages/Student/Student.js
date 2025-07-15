import React, { useState, useEffect } from "react";
import { getUser } from "../../utils/auth";
import StudentTaskList from "../../components/StudentTaskList/StudentTaskList";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import "./student.css";

export default function Student() {
  const user = getUser();
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

      <StudentTaskList
        tasks={tasks}
        studentUsername={user.username}
        onSubmitAnswer={handleAnswerSubmit}
      />
    </div>
  );
}
