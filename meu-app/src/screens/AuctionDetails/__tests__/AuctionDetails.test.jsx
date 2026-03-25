import React from 'react';
import { render, getAllByText } from '@testing-library/react-native';
import AuctionDetails from '../index';

jest.mock('react-native-gesture-handler', () => ({
  GestureDetector: ({ children }) => children,
  Gesture: {
    Pan: () => ({})
  }
}));

describe('AuctionDetails', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  const mockRoute = {
    params: {
      auction: {
        id: 1,
        titulo: 'Leilão Teste',
        cidade: 'São Paulo',
        estado: 'SP',
        leiloeiro: 'João Silva',
        descricao: 'Leilão de veículos em São Paulo',
      },
    },
  };

  it('deve renderizar informações básicas do leilão', () => {
    const { getByText, getAllByText } = render(
      <AuctionDetails navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Leilão Teste')).toBeTruthy();
    expect(getAllByText('João Silva')).toHaveLength(2);
    expect(getByText('São Paulo')).toBeTruthy();
  });

  it('deve exibir informações do leilão', () => {
    const { getByText } = render(
      <AuctionDetails navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Leilão de veículos em São Paulo')).toBeTruthy();
  });
});
