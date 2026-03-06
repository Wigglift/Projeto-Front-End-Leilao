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

  it('deve formatar valor como moeda', () => {
    const result = lotService.formatCurrency(15000);
    expect(result).toContain('R$');
  });

  it('deve validar lote válido', () => {
    const lote = {
      id: 1,
      leilao_id: 1,
      valor_inicial: '15000.00',
    };

    expect(lotService.isValidLote(lote)).toBe(true);
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
