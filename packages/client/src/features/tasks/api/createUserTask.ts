import { api } from "@/utils/axios";
import { useMutation } from "react-query";

export interface IUserTask {
  name: string;
  description: string;
  notificationToggle: boolean;
  notificationTime: string;
  streak: number;
  completed: boolean;
  user: string;
}

export const useCreateUserTask = () =>
  useMutation({
    mutationKey: "useCreateUserTask",
    mutationFn: async (task: IUserTask) => {
      const { data } = await api.post(`/tasks`, { data: task });
      return data;
    },
  });

export const useDeleteUserTask = () =>
  useMutation({
    mutationKey: "useDeleteUserTask",
    mutationFn: async (taskId: string) => {
      const { data } = await api.delete(`/userTasks/${taskId}`);
      return data;
    },
  });
