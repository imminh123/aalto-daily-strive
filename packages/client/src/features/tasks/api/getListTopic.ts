import { SignUpInput } from "@/pages/signup";
import { api } from "@/utils/axios";
import { useQuery } from "react-query";

export const useGetListTopic = () =>
  useQuery({
    queryKey: "useGetListTopic",
    queryFn: async () => {
      const { data } = await api.get("/topics");
      return data;
    },
  });
