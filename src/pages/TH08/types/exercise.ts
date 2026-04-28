export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Legs"
  | "Shoulders"
  | "Arms"
  | "Core"
  | "Full Body";

export type Level = "easy" | "medium" | "hard";

export interface Exercise {
  id: number;
  name: string;
  muscle: MuscleGroup;
  level: Level;
  description: string;
  caloriesPerHour: number;
}