import React from 'react';
import { render } from '@testing-library/react-native';
import LotFilterModal from '../index';
import lotService from '../../../../services/lotService';

jest.mock('../../../../services/lotService');

describe('LotFilterModal', () => {
  const mockOnClose = jest.fn();
  const mockOnApplyFilters = jest.fn();
  const mockLeilaoId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    lotService.getTipos.mockResolvedValue(['MEDIA_MONTA', 'BAIXA_MONTA']);
    lotService.getAnosFabricacao.mockResolvedValue([2023, 2022, 2021]);
    lotService.getCombustiveis.mockResolvedValue(['GASOLINA', 'ETANOL', 'DIESEL']);
  });

  it('deve renderizar corretamente quando visível', () => {
    const { getByText } = render(
      <LotFilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
        leilaoId={mockLeilaoId}
      />
    );

    expect(getByText('Filtros de Lotes')).toBeTruthy();
    expect(getByText('Tipo de Lote')).toBeTruthy();
    expect(getByText('Ano de Fabricação')).toBeTruthy();
    expect(getByText('Combustível')).toBeTruthy();
  });

  it('deve ter botões de Limpar e Aplicar Filtros', () => {
    const { getByText } = render(
      <LotFilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
        leilaoId={mockLeilaoId}
      />
    );

    expect(getByText('Limpar')).toBeTruthy();
    expect(getByText('Aplicar Filtros')).toBeTruthy();
  });

  it('não deve renderizar quando visível é false', () => {
    const { queryByText } = render(
      <LotFilterModal
        visible={false}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
        leilaoId={mockLeilaoId}
      />
    );

    expect(queryByText('Filtros de Lotes')).toBeNull();
  });

  it('deve ter campos de valor inicial', () => {
    const { getByPlaceholderText } = render(
      <LotFilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
        leilaoId={mockLeilaoId}
      />
    );

    expect(getByPlaceholderText('Valor mínimo (ex: 10000)')).toBeTruthy();
    expect(getByPlaceholderText('Valor máximo (ex: 50000)')).toBeTruthy();
  });
});
