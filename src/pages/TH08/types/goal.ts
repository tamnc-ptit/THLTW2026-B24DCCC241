export type GoalType =
  | "Giảm cân"
  | "Tăng cơ"
  | "Sức bền"
  | "Khác";

export type GoalStatus =
  | "active"
  | "done"
  | "cancel";

export interface Goal {
  id: number;
  name: string;
  type: GoalType;
  target: number;
  current: number;
  deadline: string;
  status: GoalStatus;
}