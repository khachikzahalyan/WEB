import React, { useState, useEffect } from "react";
import { getUser, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
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
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editTaskId) {
      setTasks(prev =>
        prev.map(task =>
          task.id === editTaskId ? { ...task, title, description } : task
        )
      );
      setEditTaskId(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        createdBy: user.username,
        answers: []
      };
      setTasks(prev => [...prev, newTask]);
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
    if (window.confirm("Удалить это задание?")) {
      setTasks(prev => prev.filter(task => task.id !== id));
      // Если открыто ReviewPanel с этим заданием, закрыть его
      if (reviewTask && reviewTask.id === id) {
        setReviewTask(null);
      }
    }
  };

  const openReview = (task) => {
    setReviewTask(task);
  };

  const closeReview = () => {
    setReviewTask(null);
  };

  const saveReview = (taskId, updatedAnswers) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, answers: updatedAnswers } : task
      )
    );
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
        onReview={openReview} // добавим кнопку "Проверить" в TaskList
      />
    </div>
  );
}
