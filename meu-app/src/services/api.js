import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
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
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log("Não autorizado - faça login novamente");
          break;
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
