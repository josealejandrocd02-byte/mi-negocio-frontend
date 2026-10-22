<<<<<<< HEAD
import axios from "axios";
import { getToken } from "@/utils/storage";

const api = axios.create({
  baseURL: "http://localhost:9080/api",
});

/*
const api = axios.create({
  baseURL: "http://localhost:9080/api",
});


const api = axios.create({
  baseURL: "https://taptapbolivia.com/api",
});
*/

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

=======
import axios from "axios";
import { getToken } from "@/utils/storage";

const api = axios.create({
  baseURL: "http://localhost:9080/api",
});

/*
const api = axios.create({
  baseURL: "http://localhost:9080/api",
});


const api = axios.create({
  baseURL: "https://taptapbolivia.com/api",
});
*/

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
export default api;