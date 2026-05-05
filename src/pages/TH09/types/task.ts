
export const STATUS = {
  TODO: "todo",
  IN_PROGRESS: "inprogress",
  DONE: "done",
} as const;

export const PRIORITY = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];
export type Priority = typeof PRIORITY[keyof typeof PRIORITY];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags: string[];
  deadline: string;   // ISO string
  createdAt: string; // ISO string
}

 

import { Dayjs } from "dayjs";

export interface TaskFormValues {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags: string[];
  deadline: Dayjs; // khác Task (string)
}

export type CreateTask = Omit<Task, "id" | "createdAt">;

export type UpdateTask = Task;

export interface Column {
  id: Status;
  title: string;
}

export type TaskMap = Record<Status, Task[]>;

export interface TaskStats {
  total: number;
  done: number;
  overdue: number;
}

export type ValueOf<T> = T[keyof T];

export const DEFAULT_COLUMNS: Column[] = [
  { id: STATUS.TODO, title: "Cần làm" },
  { id: STATUS.IN_PROGRESS, title: "Đang làm" },
  { id: STATUS.DONE, title: "Hoàn thành" },
];