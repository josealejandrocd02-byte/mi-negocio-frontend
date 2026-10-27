import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/AuthServices/authService";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe, // ← devuelve MeResponse (con stores)
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });