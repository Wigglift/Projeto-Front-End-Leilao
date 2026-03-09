import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import LotList from '../index';
import lotService from '../../../services/lotService';

jest.mock('../../../services/lotService');

describe('LotList', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const mockRoute = {
    params: {
      auction: {
        id: 1,
        titulo: 'Leilão Teste',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar a tela', async () => {
    lotService.getLotesByLeilao.mockResolvedValue([]);

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText('Lotes')).toBeTruthy();
    });
  });

  it('deve exibir mensagem quando não houver lotes', async () => {
    lotService.getLotesByLeilao.mockResolvedValue([]);

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText(/Nenhum lote disponível/)).toBeTruthy();
    });
  });

  it('deve carregar lotes do leilão', async () => {
    lotService.getLotesByLeilao.mockResolvedValue([]);

    render(<LotList navigation={mockNavigation} route={mockRoute} />);

    await waitFor(() => {
      expect(lotService.getLotesByLeilao).toHaveBeenCalledWith(1, {});
    });
  });

  it('deve exibir título do leilão', async () => {
    lotService.getLotesByLeilao.mockResolvedValue([]);

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText('Leilão Teste')).toBeTruthy();
    });
  });

  it('deve exibir contador de lotes', async () => {
    const mockLotes = [
      { id: 1, marca: 'FIAT', modelo: 'UNO', valorInicialFormatted: 'R$ 15.000,00' },
      { id: 2, marca: 'VW', modelo: 'GOL', valorInicialFormatted: 'R$ 20.000,00' },
    ];

    lotService.getLotesByLeilao.mockResolvedValue(mockLotes);

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText('2 lotes disponíveis')).toBeTruthy();
    });
  });
});
