// components/TaskManager.tsx
"use client";

import { useEffect, useState } from "react";
import './TaskManager.css'; 
import EditTask from './EditTask';  
import DeleteTask from './DeleteTask';  
import Notification from './Notification';  
import { Task } from "../interfaces/interfaces";
import { Button } from "antd";
const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);  
  const [currentTask, setCurrentTask] = useState<Task | null>(null);  
  const [notification, setNotification] = useState({ message: "", visible: false });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000); 
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle("");
    showNotification("Task added successfully!");  
  };

  const updateTask = async (task: Task) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, title: task.title, completed: !task.completed }),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    showNotification("Task updated successfully!");  
  };

  const deleteTask = async (id: number) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks(tasks.filter(task => task.id !== id));
    showNotification("Task deleted successfully!");  
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setTitle(task.title); 
    setEditMode(true);  
  };

  const confirmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask) return;

    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentTask.id,
        title,
        completed: currentTask.completed,
      }),
    });
    
    const updatedTask = await res.json();
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setEditMode(false);  
    setCurrentTask(null);  
    setTitle("");  
    showNotification("Task updated successfully!");  
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Notification message={notification.message} visible={notification.visible} />
      <h1 className="title">Task Manager</h1>
      
      <EditTask
        title={title}
        onTitleChange={setTitle}
        onSubmit={editMode ? confirmEdit : addTask}
        isEditing={editMode}
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="input"
      />

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className="task">
            <span
              className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : "text-white"}`}
              onClick={() => updateTask(task)}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleEdit(task)}  
              className="edit-button"
            >
              Edit
            </button>
            <DeleteTask onDelete={() => deleteTask(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
