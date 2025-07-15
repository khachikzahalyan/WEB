
import React, { useState, useEffect } from "react";
import { getUser, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import "./teacher.css";

export default function Teacher() {
  const user = getUser();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

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
    }
  };

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

      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
