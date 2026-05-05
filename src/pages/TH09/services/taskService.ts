import { Task } from "../types/task";

const STORAGE_KEY = "TH09_TASKS";

export const taskService = {
  getAll(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveAll(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};