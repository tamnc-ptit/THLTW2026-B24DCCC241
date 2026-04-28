import { Workout } from "../types/workout";

export const workouts: Workout[] = [
  {
    id: 1,
    date: "2026-04-01",
    type: "Cardio",
    duration: 30,
    calories: 250,
    note: "Chạy bộ công viên",
    status: "completed",
  },
  {
    id: 2,
    date: "2026-04-02",
    type: "Strength",
    duration: 45,
    calories: 300,
    note: "Tập gym",
    status: "completed",
  },
  {
    id: 3,
    date: "2026-04-03",
    type: "Yoga",
    duration: 20,
    calories: 100,
    note: "Thư giãn",
    status: "missed",
  },
];