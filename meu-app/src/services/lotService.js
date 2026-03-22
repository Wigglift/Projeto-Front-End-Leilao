import api from "./api";
import authService from "./authService";

/**
 * Serviço para gerenciar lotes de leilões
 */
const lotService = {
  /**
   * Busca todos os lotes de um leilão
   * @param {number} leilaoId - ID do leilão
   * @param {Object} filters - Filtros opcionais (km, valor_inicial, tipo, etc)
   * @returns {Promise<Array>} - Array de lotes
   */
  async getLotesByLeilao(leilaoId, filters = {}) {
    try {
      const token = await authService.getToken();

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const params = {};

      // Adiciona filtros se existirem
      if (filters.km) params.km = filters.km;
      if (filters.valor_inicial) params.valor_inicial = filters.valor_inicial;
      if (filters.tipo) params.tipo = filters.tipo;
      if (filters.tipo_veiculo) params.tipo_veiculo = filters.tipo_veiculo;
      if (filters.combustivel) params.combustivel = filters.combustivel;
      if (filters.ano_modelo) params.ano_modelo = filters.ano_modelo;
      if (filters.ano_fabricacao) params.ano_fabricacao = filters.ano_fabricacao;
      if (filters.marca) params.marca = filters.marca;
      if (filters.modelo) params.modelo = filters.modelo;
      if (filters.lance) params.lance = filters.lance;
      if (filters.cidade_documento) params.cidade_documento = filters.cidade_documento;

      const response = await api.get(`/leiloes/${leilaoId}/lotes`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data
        .map(lote => this.mapLoteData(lote))
        .filter(lote => lote !== null)
        .sort((a, b) => {
          const countItems = (lote) => {
            let count = 0;
            const itemFields = ['ar', 'vidro_eletrico', 'direcao', 'automatico', 'manual_proprietario', 'kit_gas', 'estepe'];
            itemFields.forEach(field => {
              if (lote[field] === 1 || lote[field] === true) count++;
            });
            return count;
          };
          
          const itemsA = countItems(a);
          const itemsB = countItems(b);
          
          return itemsB - itemsA;
        });
    } catch (error) {
      console.error("Erro ao buscar lotes:", error);
      throw error;
    }
  },

  /**
   * Busca anos de fabricação distintos de um leilão
   * @param {number} leilaoId - ID do leilão
   * @returns {Promise<Array>} - Array de anos
   */
  async getAnosFabricacao(leilaoId) {
    try {
      const token = await authService.getToken();

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get(`/leiloes/${leilaoId}/lotes/anos_fabricacao`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data
        .filter(item => item.ano_fabricacao && item.ano_fabricacao > 0)
        .map(item => item.ano_fabricacao)
        .sort((a, b) => b - a); // Ordenar do mais recente para o mais antigo
    } catch (error) {
      console.error("Erro ao buscar anos de fabricação:", error);
      return [];
    }
  },

  /**
   * Busca tipos de veículos distintos de um leilão
   * @param {number} leilaoId - ID do leilão
   * @returns {Promise<Array>} - Array de tipos de veículos
   */
  async getTiposVeiculos(leilaoId) {
    try {
      const token = await authService.getToken();

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get(`/leiloes/${leilaoId}/lotes/tipos_veiculos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data
        .filter(item => item.tipo_veiculo)
        .map(item => item.tipo_veiculo);
    } catch (error) {
      console.error("Erro ao buscar tipos de veículos:", error);
      return [];
    }
  },

  /**
   * Busca tipos distintos de lotes de um leilão
   * @param {number} leilaoId - ID do leilão
   * @returns {Promise<Array>} - Array de tipos
   */
  async getTipos(leilaoId) {
    try {
      const token = await authService.getToken();

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get(`/leiloes/${leilaoId}/lotes/tipos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data
        .filter(item => item.tipo)
        .map(item => item.tipo);
    } catch (error) {
      console.error("Erro ao buscar tipos:", error);
      return [];
    }
  },

  /**
   * Busca combustíveis distintos de lotes de um leilão
   * @param {number} leilaoId - ID do leilão
   * @returns {Promise<Array>} - Array de combustíveis
   */
  async getCombustiveis(leilaoId) {
    try {
      const token = await authService.getToken();

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await api.get(`/leiloes/${leilaoId}/lotes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const combustiveis = [...new Set(
        response.data
          .map(lote => lote.combustivel)
          .filter(c => c && c !== '' && c !== 'null' && c !== '-')
      )];

      return combustiveis.sort();
    } catch (error) {
      console.error("Erro ao buscar combustíveis:", error);
      return [];
    }
  },

  /**
   * Mapeia e formata os dados do lote
   * @param {Object} lote - Dados brutos do lote
   * @returns {Object} - Lote formatado
   */
  mapLoteData(lote) {
    if (!lote || typeof lote !== 'object') {
      console.warn('mapLoteData: lote inválido recebido:', lote);
      return null;
    }
    
    if (!lote.id) {
      return null;
    }

    return {
      id: lote.id,
      leilaoId: lote.leilao_id,
      km: lote.km || 0,
      valorInicial: parseFloat(lote.valor_inicial || 0),
      valorInicialFormatted: this.formatCurrency(parseFloat(lote.valor_inicial || 0)),
      tipo: lote.tipo || null,
      tipoVeiculo: lote.tipo_veiculo || null,
      combustivel: lote.combustivel || null,
      anoModelo: lote.ano_modelo > 0 ? lote.ano_modelo : null,
      anoFabricacao: lote.ano_fabricacao > 0 ? lote.ano_fabricacao : null,
      marca: lote.marca && lote.marca !== "-" && lote.marca !== "NULL" ? lote.marca : null,
      modelo: lote.modelo && lote.modelo !== "NULL" ? lote.modelo : null,
      lance: lote.lance ? parseFloat(lote.lance) : null,
      lanceFormatted: lote.lance ? this.formatCurrency(parseFloat(lote.lance)) : "Sem lances",
      cidadeDocumento: lote.cidade_documento || null,

      ar: lote.ar,
      vidroEletrico: lote.vidro_eletrico,
      direcao: lote.direcao,
      automatico: lote.automatico,
      blindagem: lote.blindagem,
      docBlindagem: lote.doc_blindagem,
      constaBlindagem: lote.consta_blindagem,
      estepe: lote.estepe,
      outroEstadoDocumento: lote.outro_estado_documento,
      placaDivergeDocumento: lote.placa_diverge_documento,
      ligando: lote.ligando,
      vidroTraseiroOriginal: lote.vidro_traseiro_original,
      constaSinistroDocumento: lote.consta_sinistro_documento,
      emissaoLaudoCsv: lote.emissao_laudo_csv,
      chassiOxidacao: lote.chassi_oxidacao,
      cambioObstruido: lote.cambio_obstruido,
      FCXcambioPericiado: lote.cambio_periciado,
      manualProprietario: lote.manual_proprietario,
      documentoGnv: lote.documento_gnv,
      kitGas: lote.kit_gas,
      parabrisaOriginal: lote.parabrisa_original,
      constaCrlve: lote.consta_crlve,
      chave: lote.chave,
      alagamento: lote.alagamento,
      ipvaPago: lote.ipva_pago,
    };
  },

  /**
   * Formata valor como moeda brasileira
   * @param {number} value - Valor numérico
   * @returns {string} - Valor formatado
   */
  formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  },

  /**
   * Formata o tipo do lote para exibição
   * @param {string} tipo - Tipo do lote
   * @returns {string} - Tipo formatado
   */
  formatTipo(tipo) {
    if (!tipo) return null;

    if (tipo === "MEDIA_MONTA") {
      return "Média Monta";
    }

    return tipo;
  },

  /**
   * Busca lote específico por ID
   * @param {number} leilaoId - ID do leilão
   * @param {number} loteId - ID do lote
   * @returns {Promise<Object>} - Lote encontrado
   */
  async getLoteById(leilaoId, loteId) {
    try {
      const lotes = await this.getLotesByLeilao(leilaoId);
      const lote = lotes.find(l => l.id === loteId);

      if (!lote) {
        throw new Error("Lote não encontrado");
      }

      return lote;
    } catch (error) {
      console.error("Erro ao buscar lote por ID:", error);
      throw error;
    }
  },
};

export default lotService;
