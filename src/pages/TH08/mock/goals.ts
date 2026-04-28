import { Goal } from "../types/goal";

export const goals: Goal[] = [
  {
    id: 1,
    name: "Giảm 5kg",
    type: "Giảm cân",
    target: 65,
    current: 70,
    deadline: "2026-06-01",
    status: "active",
  },
  {
    id: 2,
    name: "Tập 30 buổi",
    type: "Sức bền",
    target: 30,
    current: 10,
    deadline: "2026-05-30",
    status: "active",
  },
];