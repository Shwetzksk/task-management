export type StatusTypes = "in-progress" | "pending" | "completed";

export interface TaskItem {
  title: string;
  description: string;
  status: StatusTypes;
  timestamp: number;
  id: number;
}
