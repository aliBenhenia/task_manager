"use client";

import { useEffect, useState } from "react";
import '../styles/TaskManager.css'; 
import EditTask from './EditTask';  
import DeleteTask from './DeleteTask';  
import Notification from './Notification';  
import { Task } from "../interfaces/interfaces";
import { fetchTasks, addTask, updateTask, deleteTask } from "../services/taskService";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);  
  const [currentTask, setCurrentTask] = useState<Task | null>(null);  
  const [notification, setNotification] = useState({ message: "", visible: false });

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000); 
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = await addTask(title);
    setTasks([...tasks, newTask]);
    setTitle("");
    showNotification("Task added successfully!");  
  };

  const handleUpdateTask = async (task: Task) => {
    const updatedTask = await updateTask(task);
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    showNotification("Task updated successfully!");  
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
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

    const updatedTask = await updateTask({
      id: currentTask.id,
      title,
      completed: currentTask.completed,
    });
    
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
        onSubmit={editMode ? confirmEdit : handleAddTask}
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
              onClick={() => handleUpdateTask(task)}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleEdit(task)}  
              className="edit-button"
            >
              Edit
            </button>
            <DeleteTask onDelete={() => handleDeleteTask(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
