import { create } from "zustand";
import { StatusTypes, TaskItem } from "@/types/tasks";
import { devtools, persist } from "zustand/middleware";
import { STATUS } from "@/config/constants";

interface TasksProps {
  tasks: TaskItem[];
  search: string;
  onAdd: (title: string, description: string) => void;

  onDelete: (id: number) => void;
  onSearch: (text: string) => void;
  onUpdate: (
    title: string,
    description: string,
    status: StatusTypes,
    id: number
  ) => void;
}
export const useStore = create<TasksProps>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        search: "",
        onAdd: (title, description) =>
          set((state: Partial<TasksProps>) => ({
            ...state,
            tasks: [
              ...state.tasks,
              {
                title,
                description,
                id: state.tasks.length,
                status: STATUS["in-progress"].code,
                timestamp: new Date().getTime(),
              },
            ],
          })),
        onDelete: (id: number) =>
          set((state: Partial<TasksProps>) => ({
            ...state,
            tasks: state?.tasks?.filter((task) => id !== task.id) ?? [],
          })),
        onSearch: (text) =>
          set((state: Partial<TasksProps>) => ({
            ...state,
            search: text,
          })),
        onUpdate: (title, description, status, id) =>
          set((state: Partial<TasksProps>) => {
            const update = state?.tasks?.[id];

            if (update) {
              update.title = title;
              update.description = description;
              update.status = status;
            }

            const newData = [...state.tasks];
            newData[id] = update;

            return { ...state, tasks: newData };
          }),
      }),
      { name: "tasks" }
    )
  )
);
