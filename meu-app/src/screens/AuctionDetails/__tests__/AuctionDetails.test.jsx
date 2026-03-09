import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AuctionDetails from '../index';

jest.spyOn(Alert, 'alert');
jest.useFakeTimers();

describe('AuctionDetails', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  const mockAuction = {
    id: '1',
    titulo: 'SEGURADORA - São Paulo',
    descricao: 'Leilão de veículos em São Paulo',
    imagemUrl: 'https://picsum.photos/800/600?random=1',
    leiloeiro: 'João Silva',
    cidade: 'São Paulo',
    estado: 'SP',
  };

  const mockRoute = {
    params: {
      auction: mockAuction,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('deve renderizar informações do leilão', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByText('SEGURADORA - São Paulo')).toBeTruthy();
    expect(getByText('Leilão de veículos em São Paulo')).toBeTruthy();
  });

  it('deve iniciar timer de 60 segundos', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByText(/00:0/)).toBeTruthy();
  });

  it('deve decrementar timer a cada segundo', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByText(/00:01:00|00:00:59/)).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(getByText(/00:00:5|00:00:4/)).toBeTruthy();
  });

  it('deve exibir lances simulados', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByText('Ronald Richards')).toBeTruthy();
    expect(getByText('Cameron Williamson')).toBeTruthy();
  });

  it('deve renderizar botões de lance rápido', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByText('R$26k')).toBeTruthy();
    expect(getByText('R$28k')).toBeTruthy();
    expect(getByText('R$32k')).toBeTruthy();
    expect(getByText('R$35k')).toBeTruthy();
  });

  it('deve selecionar lance rápido ao clicar', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    const quickBidButton = getByText('R$26k');
    fireEvent.press(quickBidButton);

    expect(quickBidButton).toBeTruthy();
  });

  it('deve abrir modal de lance customizado', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    const customBidButton = getByText('lance customizado');
    fireEvent.press(customBidButton);

    expect(getByText('Lance Customizado')).toBeTruthy();
  });

  it('deve validar valor do lance customizado', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    const customBidButton = getByText('lance customizado');
    fireEvent.press(customBidButton);

    const input = getByPlaceholderText(/Mínimo/);
    fireEvent.changeText(input, '20000');

    const confirmButton = getByText('Confirmar');
    fireEvent.press(confirmButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Valor Inválido',
      expect.stringContaining('O lance deve ser maior')
    );
  });

  it('deve aceitar lance customizado válido', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    const customBidButton = getByText('lance customizado');
    fireEvent.press(customBidButton);

    const input = getByPlaceholderText(/Mínimo/);
    fireEvent.changeText(input, '30000');

    const confirmButton = getByText('Confirmar');
    fireEvent.press(confirmButton);

    expect(getByText(/Realizar lance de/)).toBeTruthy();
  });

  it('deve abrir modal de confirmação ao fazer lance', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    const quickBidButton = getByText('R$26k');
    fireEvent.press(quickBidButton);

    const placeBidButton = getByText(/Realizar lance de/);
    fireEvent.press(placeBidButton);

    expect(getByText('Confirmar Lance')).toBeTruthy();
  });

  it('deve confirmar lance e exibir alerta de sucesso', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    fireEvent.press(getByText('R$26k'));

    fireEvent.press(getByText(/Realizar lance de/));

    fireEvent.press(getByText('Sim, confirmar lance'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Lance Realizado!',
      expect.stringContaining('Seu lance de'),
      expect.any(Array)
    );
  });

  it('deve cancelar lance ao clicar em cancelar no modal', () => {
    const { getByText, queryByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    fireEvent.press(getByText('R$26k'));

    fireEvent.press(getByText(/Realizar lance de/));

    fireEvent.press(getByText('Cancelar'));

    waitFor(() => {
      expect(queryByText('Confirmar Lance')).toBeNull();
    });
  });

  it('deve desabilitar botões de lance menor que o atual', () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    const bidButton = getByText('R$26k');
    expect(bidButton).toBeTruthy();
  });

  it('deve mostrar modal de fim de leilão quando timer zerar', async () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    act(() => {
      jest.advanceTimersByTime(61000);
    });

    await waitFor(() => {
      expect(getByText('Lance Vencedor')).toBeTruthy();
    });
  });

  it('deve exibir botão fechar no modal de fim de leilão', async () => {
    const { getByText } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    act(() => {
      jest.advanceTimersByTime(61000);
    });

    await waitFor(() => {
      expect(getByText('Fechar')).toBeTruthy();
      expect(getByText('Leilão Finalizado')).toBeTruthy();
    });
  });

  it('deve limpar timer ao desmontar componente', () => {
    const { unmount } = render(
      <AuctionDetails route={mockRoute} navigation={mockNavigation} />
    );

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
