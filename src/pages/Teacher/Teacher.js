import React, { useState, useEffect } from "react";
import { getUser, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import ReviewPanel from "../../components/ReviewPanel";
import "./teacher.css";

export default function Teacher() {
  const user = getUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [reviewTask, setReviewTask] = useState(null); 
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (editTaskId) {
      const taskRef = doc(db, "tasks", editTaskId);
      await updateDoc(taskRef, { title, description });
      setEditTaskId(null);
    } else {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        createdBy: user.username,
        answers: []
      });
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditTaskId(task.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Համոզվա՞ծ եք, որ ցանկանում եք հեռացնել այս առաջադրանքը։")) {
      setTasks(prev => prev.filter(task => task.id !== id));
      if (reviewTask && reviewTask.id === id) {
        setReviewTask(null);
      }
    }}

  const openReview = (task) => {
    setReviewTask(task);
  };

  const closeReview = () => {
    setReviewTask(null);
  };

  const saveReview = async (taskId, updatedAnswers) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { answers: updatedAnswers });
    setReviewTask(null);
  };

  if (reviewTask) {
    return (
      <div className="teacher-main-container">
        <button className="teacher-back-button" onClick={closeReview}>
          ← Վերադառնալ առաջադրանքների ցուցակին
        </button>
        <ReviewPanel task={reviewTask} onSave={saveReview} onCancel={closeReview} />
      </div>
    );
  }

  return (
    <div className="teacher-main-container">
      <header className="teacher-header">
        <h2 className="teacher-title">👨‍🏫 Ուսուցիչ</h2>
        <p className="teacher-welcome">Բարի գալուստ, <span className="teacher-username">{user?.username}</span></p>
        <button className="teacher-logout-button" onClick={handleLogout}>Ելք</button>
      </header>

      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        isEdit={!!editTaskId}
        className="teacher-task-form"
      />

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReview={openReview}
        className="teacher-task-list"
      />
    </div>
  );
}
