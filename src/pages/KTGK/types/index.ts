export type Course = {
  id: number;
  name: string;
  instructor_id: number;
  instructor_name: string;
  student_count: number;
  description: string;
  status: "OPEN" | "CLOSED" | "PAUSED";
};

export type Instructor = {
  id: number;
  name: string;
};