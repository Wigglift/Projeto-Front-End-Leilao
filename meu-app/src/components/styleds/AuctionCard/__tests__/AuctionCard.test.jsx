import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuctionCard from '../index';

describe('Componente AuctionCard', () => {
  const mockProps = {
    title: 'Leilão de Veículos',
    description: 'Carros em ótimo estado',
    imageUrl: 'https://example.com/image.jpg',
    currentBid: 'R$ 25.000',
    timeRemaining: '2 dias',
    totalBids: 15,
    onPress: jest.fn(),
  };

  it('deve renderizar todas as props corretamente', () => {
    const { getByText } = render(<AuctionCard {...mockProps} />);
    
    expect(getByText('Leilão de Veículos')).toBeTruthy();
    expect(getByText('Carros em ótimo estado')).toBeTruthy();
    expect(getByText(/25\.000/)).toBeTruthy();
    expect(getByText('2 dias')).toBeTruthy();
    expect(getByText(/15.*lances/)).toBeTruthy();
  });

  it('deve chamar onPress quando o card é pressionado', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<AuctionCard {...mockProps} onPress={onPressMock} />);
    
    fireEvent.press(getByText('Leilão de Veículos'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar sem imagem', () => {
    const propsWithoutImage = { ...mockProps, imageUrl: undefined };
    const { getByText } = render(<AuctionCard {...propsWithoutImage} />);
    
    expect(getByText('Leilão de Veículos')).toBeTruthy();
  });

  it('deve exibir a contagem correta de lances', () => {
    const { getByText } = render(<AuctionCard {...mockProps} totalBids={42} />);
    expect(getByText(/42.*lances/)).toBeTruthy();
  });
});
