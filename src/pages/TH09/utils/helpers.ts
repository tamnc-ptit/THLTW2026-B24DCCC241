import { Task,Status } from "../types/task";


export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const isOverdue = (deadline: string): boolean => {
  return new Date(deadline) < new Date();
};

export const sortByDeadline = (a: Task, b: Task): number => {
  return (
    new Date(a.deadline).getTime() -
    new Date(b.deadline).getTime()
  );
};

export const searchTasks = (tasks: Task[], keyword: string): Task[] => {
  return tasks.filter((t) =>
    t.title.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const filterByStatus = (
  tasks: Task[],
  status?: Status
): Task[] => {
  if (!status) return tasks;
  return tasks.filter((t) => t.status === status);
};

export const groupByStatus = (tasks: Task[]) => {
  return {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    done: tasks.filter((t) => t.status === "done"),
  };
};