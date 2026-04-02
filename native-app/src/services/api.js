import axios from "axios";
import authService from "./authService";
import localUserService from "./localUserService";
import { resetToLogin } from "../navigation/navigationRef";

const API_BASE_URL = "http://ec2-3-20-227-42.us-east-2.compute.amazonaws.com:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          const token = await authService.getToken();
          if (!localUserService.isLocalToken(token)) {
            await authService.clearToken();
            resetToLogin();
          }
          break;
        }
        case 404:
          console.log("Recurso não encontrado");
          break;
        case 500:
          console.log("Erro interno do servidor");
          break;
        default:
          console.log("Erro na requisição:", error.response.data);
      }
    } else if (error.request) {
      console.log("Erro de rede - verifique sua conexão");
    } else {
      console.log("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
