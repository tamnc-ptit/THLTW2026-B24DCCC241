import { useEffect, useMemo, useState } from "react";
import { Task, Status, TaskStats } from "../types/task";
import { taskService } from "../services/taskService";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(taskService.getAll());
  }, []);

  useEffect(() => {
    taskService.saveAll(tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTaskStatus = (id: string, status: Status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  const taskMap = useMemo(() => {
    return {
      todo: tasks.filter((t) => t.status === "todo"),
      inprogress: tasks.filter((t) => t.status === "inprogress"),
      done: tasks.filter((t) => t.status === "done"),
    };
  }, [tasks]);

  const stats: TaskStats = useMemo(() => {
    const now = new Date();

    return {
      total: tasks.length,
      done: tasks.filter((t) => t.status === "done").length,
      overdue: tasks.filter(
        (t) =>
          new Date(t.deadline) < now &&
          t.status !== "done"
      ).length,
    };
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    taskMap,
    stats,
  };
}