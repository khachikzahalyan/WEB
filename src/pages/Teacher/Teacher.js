import React, { useState, useEffect } from "react";
import { getUser } from "../../utils/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";
import ReviewPanel from "../../components/ReviewPanel/ReviewPanel";
import "./teacher.css";

export default function Teacher() {
  const user = getUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineInDays, setDeadlineInDays] = useState(1);

  const [editTaskId, setEditTaskId] = useState(null);
  const [reviewTask, setReviewTask] = useState(null); 
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    });

    return () => unsubscribe();
  }, []);


  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (editTaskId) {
      const taskRef = doc(db, "tasks", editTaskId);
      await updateDoc(taskRef, { title, description, deadlineInDays });
      setEditTaskId(null);
    } else {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        createdBy: user.username,
        answers: [],
        createdAt: Timestamp.now(),
        deadlineInDays,
      });
    }

    setTitle("");
    setDescription("");
    setDeadlineInDays(1);
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDeadlineInDays(task.deadlineInDays || 1);
    setEditTaskId(task.id);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Համոզվա՞ծ եք, որ ցանկանում եք հեռացնել այս առաջադրանքը։")) {
      try {
        await deleteDoc(doc(db, "tasks", id)); 
        if (reviewTask && reviewTask.id === id) {
          setReviewTask(null);
        }
      } catch (error) {
        console.error("Ошибка при удалении задания:", error);
      }
    }
  };

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
      </header>

      <TaskForm
        title={title}
        description={description}
        deadlineInDays={deadlineInDays}
        setTitle={setTitle}
        setDescription={setDescription}
        setDeadlineInDays={setDeadlineInDays}
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
