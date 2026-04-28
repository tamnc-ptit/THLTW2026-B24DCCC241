export type WorkoutType =
  | "Cardio"
  | "Strength"
  | "Yoga"
  | "HIIT"
  | "Other";

export type WorkoutStatus = "completed" | "missed";

export interface Workout {
  id: number;
  date: string;
  type: WorkoutType;
  duration: number; // phút
  calories: number;
  note?: string;
  status: WorkoutStatus;
}