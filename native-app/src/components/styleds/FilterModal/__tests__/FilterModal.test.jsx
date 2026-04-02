import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import FilterModal from '../index';
import auctionService from '../../../../services/auctionService';

jest.mock('../../../../services/auctionService');
jest.spyOn(Alert, 'alert');

describe('FilterModal', () => {
  const mockOnClose = jest.fn();
  const mockOnApplyFilters = jest.fn();

  const mockLocations = [
    { cidade: 'São Paulo', estado: 'SP' },
    { cidade: 'Rio de Janeiro', estado: 'RJ' },
    { cidade: 'Belo Horizonte', estado: 'MG' },
  ];

  const mockAuctioneers = ['João Silva', 'Maria Santos', 'Pedro Oliveira'];

  beforeEach(() => {
    jest.clearAllMocks();
    auctionService.getCitiesAndStates.mockResolvedValue(mockLocations);
    auctionService.getAuctioneers.mockResolvedValue(mockAuctioneers);
  });

  it('deve renderizar o modal quando visível', async () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(getByText('Filtros Avançados')).toBeTruthy();
    });
  });

  it('não deve renderizar quando não visível', () => {
    const { queryByText } = render(
      <FilterModal
        visible={false}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    expect(queryByText('Filtros Avançados')).toBeNull();
  });

  it('deve carregar opções de filtro ao abrir', async () => {
    render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(auctionService.getCitiesAndStates).toHaveBeenCalled();
      expect(auctionService.getAuctioneers).toHaveBeenCalled();
    });
  });

  it('deve preencher campo de data inicial', async () => {
    const { getByPlaceholderText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(auctionService.getCitiesAndStates).toHaveBeenCalled();
    });

    const startDateInput = getByPlaceholderText('Data Inicial (YYYY-MM-DD)');
    fireEvent.changeText(startDateInput, '2024-01-01');

    expect(startDateInput.props.value).toBe('2024-01-01');
  });

  it('deve preencher campo de data final', async () => {
    const { getByPlaceholderText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(auctionService.getCitiesAndStates).toHaveBeenCalled();
    });

    const endDateInput = getByPlaceholderText('Data Final (YYYY-MM-DD)');
    fireEvent.changeText(endDateInput, '2024-12-31');

    expect(endDateInput.props.value).toBe('2024-12-31');
  });

  it('deve limpar todos os filtros ao clicar em limpar', async () => {
    const { getByPlaceholderText, getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(auctionService.getCitiesAndStates).toHaveBeenCalled();
    });

    const startDateInput = getByPlaceholderText('Data Inicial (YYYY-MM-DD)');
    fireEvent.changeText(startDateInput, '2024-01-01');

    const clearButton = getByText('Limpar');
    fireEvent.press(clearButton);

    expect(startDateInput.props.value).toBe('');
  });

  it('deve mostrar alerta se tentar aplicar sem filtros', async () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(auctionService.getCitiesAndStates).toHaveBeenCalled();
    });

    const applyButton = getByText('Aplicar Filtros');
    fireEvent.press(applyButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Atenção',
        'Selecione pelo menos um filtro para aplicar'
      );
    });
  });

  it('deve mostrar erro se data inicial maior que final', async () => {
    const { getByPlaceholderText, getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(auctionService.getCitiesAndStates).toHaveBeenCalled();
    });

    const startDateInput = getByPlaceholderText('Data Inicial (YYYY-MM-DD)');
    const endDateInput = getByPlaceholderText('Data Final (YYYY-MM-DD)');

    fireEvent.changeText(startDateInput, '2024-12-31');
    fireEvent.changeText(endDateInput, '2024-01-01');

    const applyButton = getByText('Aplicar Filtros');
    fireEvent.press(applyButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Erro',
        'A data inicial não pode ser maior que a data final'
      );
    });
  });

  it('deve aplicar filtros e fechar modal', async () => {
    const { getByPlaceholderText, getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(auctionService.getCitiesAndStates).toHaveBeenCalled();
    });

    const startDateInput = getByPlaceholderText('Data Inicial (YYYY-MM-DD)');
    const endDateInput = getByPlaceholderText('Data Final (YYYY-MM-DD)');

    fireEvent.changeText(startDateInput, '2024-01-01');
    fireEvent.changeText(endDateInput, '2024-12-31');

    const applyButton = getByText('Aplicar Filtros');
    fireEvent.press(applyButton);

    await waitFor(() => {
      expect(mockOnApplyFilters).toHaveBeenCalledWith({
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        city: null,
        state: null,
        auctioneer: null,
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('deve tratar erro ao carregar opções', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    auctionService.getCitiesAndStates.mockRejectedValue(new Error('Erro de rede'));

    render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao carregar opções de filtro:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
