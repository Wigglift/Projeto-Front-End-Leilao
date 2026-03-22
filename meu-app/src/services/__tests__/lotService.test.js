import lotService from '../lotService';
import api from '../api';
import authService from '../authService';

jest.mock('../api');
jest.mock('../authService');

describe('lotService', () => {
  const mockToken = 'test-token';

  beforeEach(() => {
    jest.clearAllMocks();
    authService.getToken.mockResolvedValue(mockToken);
  });

  describe('getLotesByLeilao', () => {
    it('deve buscar lotes com sucesso', async () => {
      const mockLotes = [
        {
          id: 1,
          leilao_id: 1,
          valor_inicial: '15000.00',
          marca: 'FIAT',
        },
      ];

      api.get.mockResolvedValue({ data: mockLotes });

      const result = await lotService.getLotesByLeilao(1);

      expect(result).toHaveLength(1);
      expect(api.get).toHaveBeenCalled();
    });

    it('deve ordenar lotes por quantidade de itens (maior primeiro)', async () => {
      const mockLotes = [
        {
          id: 1,
          leilao_id: 1,
          valor_inicial: '15000.00',
          marca: 'FIAT',
          ar: 1,
          vidro_eletrico: 1,
          direcao: 1,
          automatico: 1,
          manual_proprietario: 0,
          kit_gas: 0,
          estepe: 0, // 4 itens
        },
        {
          id: 2,
          leilao_id: 1,
          valor_inicial: '20000.00',
          marca: 'VW',
          ar: 1,
          vidro_eletrico: 1,
          direcao: 1,
          automatico: 1,
          manual_proprietario: 1,
          kit_gas: 1,
          estepe: 1, // 7 itens (deve vir primeiro)
        },
        {
          id: 3,
          leilao_id: 1,
          valor_inicial: '10000.00',
          marca: 'CHEVROLET',
          ar: 1,
          vidro_eletrico: 0,
          direcao: 0,
          automatico: 0,
          manual_proprietario: 0,
          kit_gas: 0,
          estepe: 0, // 1 item (deve vir último)
        },
      ];

      api.get.mockResolvedValue({ data: mockLotes });

      const result = await lotService.getLotesByLeilao(1);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe(2); // 7 itens - primeiro
      expect(result[1].id).toBe(1); // 4 itens - meio
      expect(result[2].id).toBe(3); // 1 item - último
    });

    it('deve remover lotes com erro de mapeamento', async () => {
      const mockLotes = [
        {
          id: 1,
          leilao_id: 1,
          valor_inicial: '15000.00',
          marca: 'FIAT',
        },
        {
          id: null, // inválido - deve ser removido
          leilao_id: 1,
          valor_inicial: '20000.00',
          marca: 'VW',
        },
      ];

      api.get.mockResolvedValue({ data: mockLotes });

      const result = await lotService.getLotesByLeilao(1);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });
  });

  it('deve formatar valor como moeda', () => {
    const result = lotService.formatCurrency(15000);
    expect(result).toContain('R$');
  });

  it('deve mapear dados do lote corretamente', () => {
    const loteRaw = {
      id: 1,
      leilao_id: 1,
      valor_inicial: '15000.00',
      marca: 'FIAT',
      modelo: 'UNO',
    };

    const result = lotService.mapLoteData(loteRaw);

    expect(result.id).toBe(1);
    expect(result.marca).toBe('FIAT');
    expect(result.valorInicial).toBe(15000);
  });

  it('deve formatar tipo de lote', () => {
    expect(lotService.formatTipo('MEDIA_MONTA')).toBe('Média Monta');

    expect(lotService.formatTipo(null)).toBe(null);
  });

  it('deve buscar anos de fabricação', async () => {
    const mockAnos = [
      { ano_fabricacao: 2020 },
      { ano_fabricacao: 2019 },
    ];

    api.get.mockResolvedValue({ data: mockAnos });

    const result = await lotService.getAnosFabricacao(1);

    expect(result).toContain(2020);
    expect(result).toContain(2019);
  });

  it('deve buscar tipos de lotes', async () => {
    const mockTipos = [
      { tipo: 'MEDIA_MONTA' },
    ];

    api.get.mockResolvedValue({ data: mockTipos });

    const result = await lotService.getTipos(1);

    expect(result).toContain('MEDIA_MONTA');
  });
});
