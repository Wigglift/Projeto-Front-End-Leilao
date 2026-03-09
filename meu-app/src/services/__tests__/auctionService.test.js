import auctionService from '../auctionService';
import api from '../api';

jest.mock('../api');

describe('AuctionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('deve retornar categorias com "Todos" como primeira opção', async () => {
      const mockTipos = [
        { tipo: 'SEGURADORA' },
        { tipo: 'BANCOS' },
      ];

      api.get.mockResolvedValue({ data: mockTipos });

      const categories = await auctionService.getCategories();

      expect(categories).toHaveLength(3);
      expect(categories[0]).toEqual({
        id: 'all',
        nome: 'Todos',
        icone: 'trophy-outline',
      });
      expect(categories[1].nome).toBe('SEGURADORA');
      expect(categories[2].nome).toBe('BANCOS');
    });

    it('deve retornar apenas "Todos" em caso de erro', async () => {
      api.get.mockRejectedValue(new Error('Erro de rede'));

      const categories = await auctionService.getCategories();

      expect(categories).toHaveLength(1);
      expect(categories[0].id).toBe('all');
    });

    it('deve filtrar tipos nulos ou inválidos', async () => {
      const mockTipos = [
        { tipo: 'SEGURADORA' },
        { tipo: null },
        { tipo: undefined },
        { tipo: 'BANCOS' },
      ];

      api.get.mockResolvedValue({ data: mockTipos });

      const categories = await auctionService.getCategories();

      expect(categories).toHaveLength(3); // all + 2 válidos
      expect(categories.map(c => c.nome)).toEqual(['Todos', 'SEGURADORA', 'BANCOS']);
    });
  });

  describe('getActiveAuctions', () => {
    it('deve retornar leilões ativos formatados', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          horario: '14:00:00',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
          leiloeiro: 'João Silva',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const auctions = await auctionService.getActiveAuctions();

      expect(auctions).toHaveLength(1);
      expect(auctions[0]).toMatchObject({
        id: '1',
        titulo: 'SEGURADORA - São Paulo',
        cidade: 'São Paulo',
        estado: 'SP',
        tipo: 'SEGURADORA',
        leiloeiro: 'João Silva',
        status: 'ativo',
      });
    });

    it('deve filtrar leilões sem dados obrigatórios', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
        },
        {
          id: 2,
          // falta data
          tipo: 'BANCOS',
          cidade: 'Rio',
          estado: 'RJ',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const auctions = await auctionService.getActiveAuctions();

      expect(auctions).toHaveLength(1);
      expect(auctions[0].id).toBe('1');
    });
  });

  describe('searchAuctions', () => {
    it('deve buscar leilões por cidade', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
        },
        {
          id: 2,
          data: '2024-12-31',
          tipo: 'BANCOS',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const results = await auctionService.searchAuctions('são paulo');

      expect(results).toHaveLength(1);
      expect(results[0].cidade).toBe('São Paulo');
    });

    it('deve buscar leilões por tipo', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
        },
        {
          id: 2,
          data: '2024-12-31',
          tipo: 'BANCOS',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const results = await auctionService.searchAuctions('bancos');

      expect(results).toHaveLength(1);
      expect(results[0].tipo).toBe('BANCOS');
    });

    it('deve retornar array vazio quando não encontrar resultados', async () => {
      api.get.mockResolvedValue({ data: [] });

      const results = await auctionService.searchAuctions('inexistente');

      expect(results).toHaveLength(0);
    });
  });

  describe('getAuctionsByCategory', () => {
    it('deve retornar todos os leilões quando categoria for "all"', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const auctions = await auctionService.getAuctionsByCategory('all');

      expect(auctions).toHaveLength(1);
    });

    it('deve buscar leilões por tipo específico', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          tipo: 'BANCOS',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const auctions = await auctionService.getAuctionsByCategory('bancos');

      expect(api.get).toHaveBeenCalledWith('/leiloes/tipo/BANCOS');
      expect(auctions).toHaveLength(1);
    });

    it('deve retornar array vazio em caso de erro', async () => {
      api.get.mockRejectedValue(new Error('Erro de rede'));

      const auctions = await auctionService.getAuctionsByCategory('bancos');

      expect(auctions).toHaveLength(0);
    });
  });

  describe('getAuctionsByDateRange', () => {
    it('deve buscar leilões por intervalo de datas', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-15',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const auctions = await auctionService.getAuctionsByDateRange(
        '2024-12-01',
        '2024-12-31'
      );

      expect(api.get).toHaveBeenCalledWith('/leiloes/intervalo_data/2024-12-01/2024-12-31');
      expect(auctions).toHaveLength(1);
    });

    it('deve lançar erro quando a requisição falhar', async () => {
      api.get.mockRejectedValue(new Error('Erro de rede'));

      await expect(
        auctionService.getAuctionsByDateRange('2024-12-01', '2024-12-31')
      ).rejects.toThrow('Erro de rede');
    });
  });

  describe('getAuctionsByLocation', () => {
    it('deve buscar leilões por cidade e estado', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const auctions = await auctionService.getAuctionsByLocation('São Paulo', 'SP');

      expect(api.get).toHaveBeenCalledWith('/leiloes/localidade', {
        params: { cidade: 'São Paulo', estado: 'SP' },
      });
      expect(auctions).toHaveLength(1);
      expect(auctions[0].cidade).toBe('São Paulo');
    });
  });

  describe('getAuctionsByAuctioneer', () => {
    it('deve buscar leilões por leiloeiro', async () => {
      const mockLeiloes = [
        {
          id: 1,
          data: '2024-12-31',
          tipo: 'SEGURADORA',
          cidade: 'São Paulo',
          estado: 'SP',
          leiloeiro: 'João Silva',
        },
      ];

      api.get.mockResolvedValue({ data: mockLeiloes });

      const auctions = await auctionService.getAuctionsByAuctioneer('João Silva');

      expect(api.get).toHaveBeenCalledWith('/leiloes/leiloeiro/João Silva');
      expect(auctions).toHaveLength(1);
      expect(auctions[0].leiloeiro).toBe('João Silva');
    });
  });

  describe('getAuctioneers', () => {
    it('deve retornar lista de leiloeiros', async () => {
      const mockLeiloeiros = ['João Silva', 'Maria Santos', 'Pedro Oliveira'];

      api.get.mockResolvedValue({ data: mockLeiloeiros });

      const auctioneers = await auctionService.getAuctioneers();

      expect(api.get).toHaveBeenCalledWith('/leiloes/leiloeiros');
      expect(auctioneers).toHaveLength(3);
      expect(auctioneers).toEqual(mockLeiloeiros);
    });
  });

  describe('getCitiesAndStates', () => {
    it('deve retornar lista de cidades e estados', async () => {
      const mockCidades = [
        { cidade: 'São Paulo', estado: 'SP' },
        { cidade: 'Rio de Janeiro', estado: 'RJ' },
      ];

      api.get.mockResolvedValue({ data: mockCidades });

      const cities = await auctionService.getCitiesAndStates();

      expect(api.get).toHaveBeenCalledWith('/leiloes/cidades_estados');
      expect(cities).toHaveLength(2);
    });
  });
});
