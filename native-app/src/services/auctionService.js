import api from "./api";
import {calculateTimeRemaining, formatCurrency} from "../utils/timeUtils";

/**
 * Service para gerenciar leilões
 */
const auctionService = {
    /**
     * Busca todas as categorias disponíveis
     * @returns {Promise<Array>} - Array de categorias
     */
    async getCategories() {
        try {
            const response = await api.get("/categorias");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            throw error;
        }
    },

    /**
     * Busca todos os leilões
     * @param {Object} params - Parâmetros de filtro
     * @param {string} params.status - Status do leilão (ativo, encerrado, etc)
     * @param {string} params.categoriaId - ID da categoria para filtrar
     * @returns {Promise<Array>} - Array de leilões
     */
    async getAuctions(params = {}) {
        try {
            const response = await api.get("/leiloes", {params});

            const processedAuctions = response.data.map((auction) => ({
                ...auction,
                timeRemaining: calculateTimeRemaining(auction.dataFim),
                currentBidFormatted: formatCurrency(auction.lanceAtual),
            }));

            return processedAuctions;
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
        return this.getAuctions({status: "ativo"});
    },

    /**
     * Busca leilões por categoria
     * @param {string} categoryId - ID da categoria
     * @returns {Promise<Array>} - Array de leilões da categoria
     */
    async getAuctionsByCategory(categoryId) {
        if (categoryId === "all") {
            return this.getActiveAuctions();
        }
        return this.getAuctions({status: "ativo", categoriaId: categoryId});
    },
    /**
     * Busca leilões com base em uma query de pesquisa
     * @param {string} query - Texto de busca
     * @returns {Promise<Array>} - Array de leilões encontrados
     */
    async searchAuctions(query) {
        try {
            const response = await api.get("/leiloes", {
                params: {q: query, status: "ativo"},
            });

            const processedAuctions = response.data.map((auction) => ({
                ...auction,
                timeRemaining: calculateTimeRemaining(auction.dataFim),
                currentBidFormatted: formatCurrency(auction.lanceAtual),
            }));

            return processedAuctions;
        } catch (error) {
            console.error("Erro ao buscar leilões:", error);
            throw error;
        }
    },
};

export default auctionService;
