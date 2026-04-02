import api from "./api";
import { calculateTimeRemaining, formatCurrency } from "../utils/timeUtils";

/**
 * Verifica se um leilão tem dados válidos
 * @param {Object} apiAuction - Dados do leilão da API
 * @returns {boolean} - True se o leilão é válido
 */
const isValidAuction = (apiAuction) => {
  return (
    apiAuction.id &&
    apiAuction.data &&
    apiAuction.tipo &&
    apiAuction.cidade &&
    apiAuction.estado
  );
};

/**
 * Mapeia os dados da API para o formato esperado pelo frontend
 * @param {Object} apiAuction - Dados do leilão da API
 * @returns {Object} - Leilão formatado
 */
const mapAuctionData = (apiAuction) => {
  const auctionDate = new Date(apiAuction.data);
  const [hours, minutes] = (apiAuction.horario || "00:00:00").split(":");
  auctionDate.setHours(parseInt(hours), parseInt(minutes));

  const tipo = String(apiAuction.tipo || "Leilão");
  const cidade = apiAuction.cidade || "N/D";
  const estado = apiAuction.estado || "";

  return {
    id: apiAuction.id?.toString(),
    titulo: `${tipo} - ${cidade}`,
    descricao: `Leilão realizado em ${cidade}, ${estado}. ${apiAuction.leiloeiro ? `Leiloeiro: ${apiAuction.leiloeiro}` : ""}`.trim(),
    imagemUrl: `https://picsum.photos/seed/auction-${apiAuction.id}/400/300.jpg`,
    lanceAtual: 0,
    lanceMinimo: 100,
    dataInicio: apiAuction.data,
    dataFim: auctionDate.toISOString(),
    status: "ativo",
    tipo: tipo,
    cidade: cidade,
    estado: estado,
    leiloeiro: apiAuction.leiloeiro || null,
    horario: apiAuction.horario,
    timeRemaining: calculateTimeRemaining(auctionDate.toISOString()),
    totalLotes: apiAuction.total_lotes || apiAuction.totalLotes || 0,
    currentBidFormatted: formatCurrency(0),
    totalLances: 0,
    participantes: 0,
  };
};

/**
 * Mapeamento de ícones por tipo de leilão
 */
const ICON_MAP = {
  "all": "trophy-outline",                      // Todos
  "seguradora": "shield-checkmark-outline",     // Seguradora
  "seguradoras": "shield-checkmark-outline",    // Seguradoras
  "bancos": "business-outline",                 // Bancos
};

/**
 * Obtém o ícone para cada tipo
 * @param {string} tipo - Nome do tipo
 * @returns {string} - Nome do ícone
 */
const getIconForType = (tipo) => {
  if (!tipo || typeof tipo !== 'string') {
    return "pricetag-outline";
  }
  const key = tipo.toLowerCase().replace(/\s+/g, "_");
  return ICON_MAP[key] || "pricetag-outline";
};

/**
 * Service para gerenciar leilões
 */
const auctionService = {
  /**
   * Busca todos os tipos de leilão disponíveis (usado como categorias conforme o tipo)
   * @returns {Promise<Array>} - Array de tipos/categorias
   */
  async getCategories() {
    try {
      const response = await api.get("/leiloes/tipos");
      const tiposData = response.data || [];

      const tiposValidos = tiposData
        .filter(item => item && item.tipo !== null && item.tipo !== undefined)
        .map(item => {
          const tipo = item.tipo;
          return typeof tipo === 'string' ? tipo : String(tipo);
        })
        .filter(tipo => tipo && tipo !== 'null' && tipo !== 'undefined');

      const tiposUnicos = [...new Set(tiposValidos)];

      const categories = [
        { 
          id: "all", 
          nome: "Todos",
          icone: ICON_MAP["all"]
        },
        ...tiposUnicos
          .filter(tipo => tipo && typeof tipo === 'string')
          .map((tipo) => ({
            id: tipo.toLowerCase().replace(/\s+/g, "_"),
            nome: tipo,
            icone: getIconForType(tipo)
          })),
      ];

      return categories;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return [{ id: "all", nome: "Todos", icone: "trophy-outline" }];
    }
  },

  /**
   * Busca todos os leilões
   * @returns {Promise<Array>} - Array de leilões
   */
  async getAuctions() {
    try {
      const response = await api.get("/leiloes");
      return response.data
        .filter(isValidAuction)
        .map(mapAuctionData);
    } catch (error) {
      console.error("Erro ao buscar leilões:", error);
      throw error;
    }
  },

  /**
   * Busca leilões ativos
   * @returns {Promise<Array>} - Array de leilões ativos
   */
  async getActiveAuctions() {
    return this.getAuctions();
  },

  /**
   * Busca leilões por categoria/tipo
   * @param {string} categoryId - ID da categoria (tipo)
   * @returns {Promise<Array>} - Array de leilões da categoria
   */
  async getAuctionsByCategory(categoryId) {
    try {
      if (categoryId === "all") {
        return this.getActiveAuctions();
      }

      const tipo = categoryId.replace(/_/g, " ").toUpperCase();
      const response = await api.get(`/leiloes/tipo/${tipo}`);
      return response.data
        .filter(isValidAuction)
        .map(mapAuctionData);
    } catch (error) {
      console.error("Erro ao buscar leilões por categoria:", error);
      return [];
    }
  },

  /**
   * Busca leilões com base em uma query de pesquisa
   * Busca por cidade, estado ou leiloeiro
   * @param {string} query - Texto de busca
   * @returns {Promise<Array>} - Array de leilões encontrados
   */
  async searchAuctions(query) {
    try {
      const allAuctions = await this.getAuctions();
      const searchTerm = query.toLowerCase();

      return allAuctions.filter(
        (auction) =>
          auction.titulo?.toLowerCase().includes(searchTerm) ||
          auction.cidade?.toLowerCase().includes(searchTerm) ||
          auction.estado?.toLowerCase().includes(searchTerm) ||
          auction.leiloeiro?.toLowerCase().includes(searchTerm) ||
          auction.tipo?.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error("Erro ao buscar leilões:", error);
      throw error;
    }
  },

  /**
   * Busca leilões por intervalo de datas
   * @param {string} dataInicial - Data inicial (YYYY-MM-DD)
   * @param {string} dataFinal - Data final (YYYY-MM-DD)
   * @returns {Promise<Array>} - Array de leilões no intervalo
   */
  async getAuctionsByDateRange(dataInicial, dataFinal) {
    try {
      const response = await api.get(
        `/leiloes/intervalo_data/${dataInicial}/${dataFinal}`
      );
      return response.data
        .filter(isValidAuction)
        .map(mapAuctionData);
    } catch (error) {
      console.error("Erro ao buscar leilões por intervalo de datas:", error);
      throw error;
    }
  },

  /**
   * Busca leilões por localidade
   * @param {string} cidade - Nome da cidade (opcional)
   * @param {string} estado - Sigla do estado (opcional)
   * @returns {Promise<Array>} - Array de leilões da localidade
   */
  async getAuctionsByLocation(cidade, estado) {
    try {
      if (!cidade && !estado) {
        return this.getActiveAuctions();
      }

      const params = {};
      if (cidade) params.cidade = cidade;
      if (estado) params.estado = estado;

      const response = await api.get("/leiloes/localidade", { params });
      return response.data
        .filter(isValidAuction)
        .map(mapAuctionData);
    } catch (error) {
      console.error("Erro ao buscar leilões por localidade:", error);
      try {
        const allAuctions = await this.getAuctions();
        return allAuctions.filter(auction => {
          const matchCity = !cidade || auction.cidade?.toLowerCase() === cidade.toLowerCase();
          const matchState = !estado || auction.estado?.toLowerCase() === estado.toLowerCase();
          return matchCity && matchState;
        });
      } catch (fallbackError) {
        console.error("Erro no fallback de localidade:", fallbackError);
        throw error;
      }
    }
  },

  /**
   * Busca leilões por leiloeiro
   * @param {string} nome - Nome do leiloeiro
   * @returns {Promise<Array>} - Array de leilões do leiloeiro
   */
  async getAuctionsByAuctioneer(nome) {
    try {
      const response = await api.get(`/leiloes/leiloeiro/${nome}`);
      return response.data
        .filter(isValidAuction)
        .map(mapAuctionData);
    } catch (error) {
      console.error("Erro ao buscar leilões por leiloeiro:", error);
      throw error;
    }
  },

  /**
   * Busca todos os leiloeiros
   * @returns {Promise<Array>} - Array de leiloeiros
   */
  async getAuctioneers() {
    try {
      const response = await api.get("/leiloes/leiloeiros");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar leiloeiros:", error);
      throw error;
    }
  },

  /**
   * Busca todas as cidades e estados disponíveis
   * @returns {Promise<Array>} - Array de cidades e estados
   */
  async getCitiesAndStates() {
    try {
      const response = await api.get("/leiloes/cidades_estados");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar cidades e estados:", error);
      throw error;
    }
  },
};

export default auctionService;
