import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AuctionListForLots from '../index';
import auctionService from '../../../services/auctionService';

jest.mock('../../../services/auctionService');

describe('AuctionListForLots', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar a tela', async () => {
    auctionService.getActiveAuctions.mockResolvedValue([]);

    const { getByText } = render(
      <AuctionListForLots navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Lotes')).toBeTruthy();
    });
  });

  it('deve exibir mensagem quando não houver leilões', async () => {
    auctionService.getActiveAuctions.mockResolvedValue([]);

    const { getByText } = render(
      <AuctionListForLots navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText(/Nenhum leilão disponível/)).toBeTruthy();
    });
  });

  it('deve carregar leilões ao montar', async () => {
    auctionService.getActiveAuctions.mockResolvedValue([]);

    render(<AuctionListForLots navigation={mockNavigation} />);

    await waitFor(() => {
      expect(auctionService.getActiveAuctions).toHaveBeenCalled();
    });
  });

  it('deve exibir subtítulo correto', async () => {
    auctionService.getActiveAuctions.mockResolvedValue([]);

    const { getByText } = render(
      <AuctionListForLots navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Selecione um leilão para ver os lotes')).toBeTruthy();
    });
  });

  it('deve exibir leilões quando houver', async () => {
    const mockAuctions = [
      {
        id: 1,
        titulo: 'Leilão SP',
        descricao: 'Teste',
        imagemUrl: 'https://test.com/img.jpg',
      },
    ];

    auctionService.getActiveAuctions.mockResolvedValue(mockAuctions);

    const { getByText } = render(
      <AuctionListForLots navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Leilão SP')).toBeTruthy();
    });
  });
});
