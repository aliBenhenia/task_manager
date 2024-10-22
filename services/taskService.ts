
import { Task } from "../interfaces/interfaces";

const API_URL = "/api/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return await res.json();
};

export const addTask = async (title: string): Promise<Task> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    if (!res.ok) {
        throw new Error("Failed to add task");
    }
    return await res.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
    const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, title: task.title, completed: !task.completed }),
    });
    if (!res.ok) {
        throw new Error("Failed to update task");
    }
    return await res.json();
};

export const deleteTask = async (id: number): Promise<void> => {
    const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    if (!res.ok) {
        throw new Error("Failed to delete task");
    }
};
