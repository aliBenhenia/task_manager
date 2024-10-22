"use client";

import TaskManager from "../../components/TaskManager";
import { ThemeProvider } from "../../context/ThemeContext";

export default function Home() {
  return (
    <div className="container">
       <ThemeProvider>
          <TaskManager />
        </ThemeProvider>
    </div>
  );
}
