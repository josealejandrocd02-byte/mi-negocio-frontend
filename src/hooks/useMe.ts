<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/services/userService";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],

    queryFn: getMe,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
=======
import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/services/userService";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],

    queryFn: getMe,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
};