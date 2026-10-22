<<<<<<< HEAD
import api from "@/api/client";
import { log } from "console";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl?: string;
}

/* 👤 GET usuario logeado */
export const getMe = async (): Promise<UserDTO> => {
  const res = await api.get("/users/get_me");
  return res.data;
};
=======
import api from "@/api/client";
import { log } from "console";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl?: string;
}

/* 👤 GET usuario logeado */
export const getMe = async (): Promise<UserDTO> => {
  const res = await api.get("/users/get_me");
  return res.data;
};
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
