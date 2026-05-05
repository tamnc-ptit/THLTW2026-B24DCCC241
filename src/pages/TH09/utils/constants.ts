import { Status, Priority } from "../types/task";

export const STATUS: Record<string, Status> = {
  TODO: "todo",
  IN_PROGRESS: "inprogress",
  DONE: "done",
};

export const PRIORITY: Record<string, Priority> = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const STATUS_LABEL: Record<Status, string> = {
  todo: "Cần làm",
  inprogress: "Đang làm",
  done: "Hoàn thành",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: "Cao",
  medium: "Trung bình",
  low: "Thấp",
};