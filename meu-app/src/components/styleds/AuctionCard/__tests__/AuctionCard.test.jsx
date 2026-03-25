import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuctionCard from '../index';

describe('AuctionCard', () => {
  const mockProps = {
    title: 'Leilão de Veículos',
    description: 'Carros em ótimo estado',
    imageUrl: 'https://example.com/image.jpg',
    onPress: jest.fn(),
  };

  it('deve renderizar informações essenciais do leilão', () => {
    const { getByText } = render(<AuctionCard {...mockProps} />);
    
    expect(getByText('Leilão de Veículos')).toBeTruthy();
    expect(getByText('Carros em ótimo estado')).toBeTruthy();
  });

  it('deve chamar onPress quando o card é pressionado', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<AuctionCard {...mockProps} onPress={onPressMock} />);
    
    fireEvent.press(getByText('Leilão de Veículos'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar sem imagem quando imageUrl não fornecido', () => {
    const propsWithoutImage = { ...mockProps, imageUrl: undefined };
    const { getByText } = render(<AuctionCard {...propsWithoutImage} />);
    
    expect(getByText('Leilão de Veículos')).toBeTruthy();
  });
});
