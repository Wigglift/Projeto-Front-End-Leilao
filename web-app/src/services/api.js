import axios from 'axios';

const BASE_URL = 'http://ec2-3-20-227-42.us-east-2.compute.amazonaws.com:3000';

// Cria a instância do Axios com a URL e cabeçalhos padrão
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Adiciona o Token automaticamente antes de qualquer requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Leiloes:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, // Se a resposta for OK (200), apenas retorna ela
  async (error) => {
    const originalRequest = error.config;

    // Verifica se o erro é 401 e se ainda não tentamos renovar (evita loop infinito)
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tenta fazer o login novamente para obter um novo token
        const novoToken = await renovarTokenAutomaticamente();
        
        // Atualiza o header da requisição que falhou com o novo token
        originalRequest.headers.Authorization = `Bearer ${novoToken}`;
        
        // Refaz a requisição original com o novo token
        return api(originalRequest);
      } catch (err) {
        // Se falhar o login de renovação, desloga o usuário
        localStorage.removeItem('@Leiloes:token');
        // Opcional: window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

async function renovarTokenAutomaticamente() {
  const response = await axios.post(`${BASE_URL}/login`, {
    username: 'leilao_test_api',
    password: 'Ftwj029E',
  });
  
  const { accessToken } = response.data;
  localStorage.setItem('@Leiloes:token', accessToken);
  return accessToken;
}

// --- AUTENTICAÇÃO ---

export async function login() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username: 'leilao_test_api',
      password: 'Ftwj029E',
    });
    
    const { accessToken } = response.data;
    // Salva o token no localStorage para persistência
    localStorage.setItem('@Leiloes:token', accessToken);
    return accessToken;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('@Leiloes:token');
}

// --- ENDPOINTS DE LEILÕES ---

export const leiloesService = {
  // Listar todos os leilões
  listarTodos: () => api.get('/leiloes'),

  // Leilões por intervalo de data
  listarPorData: (dataInicial, dataFinal) => 
    api.get(`/leiloes/intervalo_data/${dataInicial}/${dataFinal}`),

  // Leilões por tipo
  listarPorTipo: (tipo) => api.get(`/leiloes/tipo/${tipo}`),

  // Leilões por localidade (usando params para montar a query string)
  listarPorLocalidade: (cidade, estado) => 
    api.get('/leiloes/localidade', { params: { cidade, estado } }),

  // Leilões por leiloeiro
  listarPorLeiloeiro: (nome) => api.get(`/leiloes/leiloeiro/${nome}`),

  // Listagens de dados distintos (filtros)
  obterLeiloeiros: () => api.get('/leiloes/leiloeiros'),
  obterCidadesEstados: () => api.get('/leiloes/cidades_estados'),
  obterTipos: () => api.get('/leiloes/tipos'),

  // --- ENDPOINTS DE LOTES ---
  
  // Busca lotes de um leilão específico (com filtros opcionais)
  // Exemplo de params: { km: 50000, tipo: 'CARRO', marca: 'FIAT' }
  obterLotes: (leilaoId, filtros = {}) => 
    api.get(`/leiloes/${leilaoId}/lotes`, { params: filtros }),

  obterAnosFabricacaoLotes: (leilaoId) => 
    api.get(`/leiloes/${leilaoId}/lotes/anos_fabricacao`),

  obterTiposVeiculosLotes: (leilaoId) => 
    api.get(`/leiloes/${leilaoId}/lotes/tipos_veiculos`),

  obterTiposLotes: (leilaoId) => 
    api.get(`/leiloes/${leilaoId}/lotes/tipos`)
};