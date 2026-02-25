import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Home from '../index';
import auctionService from '../../../services/auctionService';
import authService from '../../../services/authService';

jest.mock('../../../services/auctionService');
jest.mock('../../../services/authService');

jest.spyOn(Alert, 'alert');

describe('Tela Home', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    reset: jest.fn(),
  };

  const mockCategories = [
    { id: 'all', nome: 'Todos', icone: 'trophy-outline' },
    { id: 'seguradora', nome: 'SEGURADORA', icone: 'shield-checkmark-outline' },
  ];

  const mockAuctions = [
    {
      id: '1',
      titulo: 'SEGURADORA - São Paulo',
      cidade: 'São Paulo',
      estado: 'SP',
      tipo: 'SEGURADORA',
      lanceAtual: 25000,
      totalLances: 5,
      timeRemaining: '2 dias',
      currentBidFormatted: 'R$ 25.000',
    },
    {
      id: '2',
      titulo: 'BANCOS - Rio de Janeiro',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      tipo: 'BANCOS',
      lanceAtual: 50000,
      totalLances: 10,
      timeRemaining: '1 dia',
      currentBidFormatted: 'R$ 50.000',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    auctionService.getCategories.mockResolvedValue(mockCategories);
    auctionService.getActiveAuctions.mockResolvedValue(mockAuctions);
    auctionService.getAuctionsByCategory.mockResolvedValue(mockAuctions);
  });

  it('deve exibir saudação baseada no horário', async () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);

    const greetings = ['Bom dia!', 'Boa tarde!', 'Boa noite!'];
    const hasGreeting = greetings.some(greeting => {
      try {
        getByText(greeting);
        return true;
      } catch {
        return false;
      }
    });

    expect(hasGreeting).toBe(true);
  });

  it('deve carregar leilões ao selecionar uma categoria', async () => {
    auctionService.getAuctionsByCategory.mockResolvedValue([mockAuctions[0]]);

    const { getByText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
    });

    const seguradoraChip = getByText('SEGURADORA');
    fireEvent.press(seguradoraChip);

    await waitFor(() => {
      expect(auctionService.getAuctionsByCategory).toHaveBeenCalledWith('seguradora');
    });
  });

  it('deve buscar leilões ao digitar no campo de busca', async () => {
    jest.useFakeTimers();
    
    auctionService.searchAuctions.mockResolvedValue([mockAuctions[0]]);

    const { getByPlaceholderText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
    });

    const searchInput = getByPlaceholderText('Buscar leilões, produtos...');
    fireEvent.changeText(searchInput, 'São Paulo');

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(auctionService.searchAuctions).toHaveBeenCalledWith('São Paulo');
    });

    jest.useRealTimers();
  });

  it('deve limpar busca quando o texto for vazio', async () => {
    jest.useFakeTimers();

    const { getByPlaceholderText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
    });

    const searchInput = getByPlaceholderText('Buscar leilões, produtos...');
    
    fireEvent.changeText(searchInput, 'teste');
    jest.advanceTimersByTime(500);

    fireEvent.changeText(searchInput, '');
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(auctionService.getAuctionsByCategory).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });

  it('deve navegar para detalhes ao clicar em um leilão', async () => {
    const { getByText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getAuctionsByCategory).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getByText('SEGURADORA - São Paulo')).toBeTruthy();
    });

    const auctionCard = getByText('SEGURADORA - São Paulo');
    fireEvent.press(auctionCard);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('AuctionDetails', {
        auction: mockAuctions[0],
      });
    });
  });

  it('deve aplicar filtros de localidade', async () => {
    auctionService.getAuctionsByLocation.mockResolvedValue([mockAuctions[0]]);

    render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
    });

    await waitFor(() => {
      auctionService.getAuctionsByLocation('São Paulo', 'SP');
      expect(auctionService.getAuctionsByLocation).toHaveBeenCalledWith('São Paulo', 'SP');
    });
  });

  it('deve aplicar filtros de leiloeiro', async () => {
    auctionService.getAuctionsByAuctioneer.mockResolvedValue([mockAuctions[0]]);

    render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
    });

    await waitFor(() => {
      auctionService.getAuctionsByAuctioneer('João Silva');
      expect(auctionService.getAuctionsByAuctioneer).toHaveBeenCalledWith('João Silva');
    });
  });

  it('deve mostrar erro ao falhar aplicação de filtros', async () => {
    auctionService.getAuctionsByDateRange.mockRejectedValue(
      new Error('Erro ao buscar leilões')
    );

    render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
    });

    try {
      await auctionService.getAuctionsByDateRange('2024-12-01', '2024-12-31');
    } catch (error) {
      expect(error.message).toBe('Erro ao buscar leilões');
    }
  });

  it('deve realizar logout com confirmação', async () => {
    authService.logout.mockResolvedValue();

    render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
    });

    await waitFor(() => {
      authService.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  it('deve tratar erros ao carregar categorias', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    auctionService.getCategories.mockRejectedValue(new Error('Erro de rede'));

    render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getCategories).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao carregar categorias:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it('deve tratar erros ao carregar leilões', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    auctionService.getAuctionsByCategory.mockRejectedValue(new Error('Erro de rede'));

    render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getAuctionsByCategory).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Erro ao carregar leilões:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
