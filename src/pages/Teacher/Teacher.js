import React, { useState, useEffect } from "react";
import { getUser, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
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
  const [tasks, setTasks] = useState([]);

  // Подписка на коллекцию tasks из Firestore (реальное время)
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

  // Добавление или редактирование задания
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

  const handleDelete = async (id) => {
    if (window.confirm("Удалить это задание?")) {
      await deleteDoc(doc(db, "tasks", id));
      if (reviewTask && reviewTask.id === id) setReviewTask(null);
    }
  };

  const openReview = (task) => {
    setReviewTask(task);
  };

  const closeReview = () => {
    setReviewTask(null);
  };

  // Сохранение результатов проверки учителем в Firestore
  const saveReview = async (taskId, updatedAnswers) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { answers: updatedAnswers });
    setReviewTask(null);
  };

  if (reviewTask) {
    return (
      <div className="teacher-container">
        <button onClick={closeReview} style={{ marginBottom: "10px" }}>
          ← Назад к списку заданий
        </button>
        <ReviewPanel task={reviewTask} onSave={saveReview} onCancel={closeReview} />
      </div>
    );
  }

  return (
    <div className="teacher-container">
      <h2>👨‍🏫 Панель Учителя</h2>
      <p>Добро пожаловать, {user?.username}</p>
      <button onClick={handleLogout}>Выйти</button>

      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        isEdit={!!editTaskId}
      />

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReview={openReview}
      />
    </div>
  );
}
