import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LotCard from '../index';

describe('LotCard', () => {
  const mockLote = {
    id: 1,
    marca: 'FIAT',
    modelo: 'UNO',
    valorInicialFormatted: 'R$ 15.000,00',
    tipo: 'MEDIA_MONTA',
    tipoVeiculo: 'CARRO',
  };

  const mockOnPress = jest.fn();

  it('deve renderizar o card', () => {
    const { getByText } = render(
      <LotCard lote={mockLote} onPress={mockOnPress} />
    );

    expect(getByText('FIAT UNO')).toBeTruthy();
    expect(getByText('R$ 15.000,00')).toBeTruthy();
  });

  it('deve exibir o tipo de veículo', () => {
    const { getByText } = render(
      <LotCard lote={mockLote} onPress={mockOnPress} />
    );

    expect(getByText('CARRO')).toBeTruthy();
  });

  it('deve exibir badge do tipo', () => {
    const { getByText } = render(
      <LotCard lote={mockLote} onPress={mockOnPress} />
    );

    expect(getByText('MÉDIA')).toBeTruthy();
  });

  it('deve exibir lote quando não houver marca', () => {
    const loteSimples = { ...mockLote, marca: null, modelo: null };

    const { getByText } = render(
      <LotCard lote={loteSimples} onPress={mockOnPress} />
    );

    expect(getByText('Lote #1')).toBeTruthy();
  });

  it('deve chamar onPress quando clicado', () => {
    const { UNSAFE_getByType } = render(
      <LotCard lote={mockLote} onPress={mockOnPress} />
    );

    const touchable = UNSAFE_getByType(require('react-native').TouchableOpacity);
    fireEvent.press(touchable);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('deve exibir lance quando houver', () => {
    const loteComLance = { ...mockLote, lance: 16000, lanceFormatted: 'R$ 16.000,00' };

    const { getByText } = render(
      <LotCard lote={loteComLance} onPress={mockOnPress} />
    );

    expect(getByText('R$ 16.000,00')).toBeTruthy();
  });
});
