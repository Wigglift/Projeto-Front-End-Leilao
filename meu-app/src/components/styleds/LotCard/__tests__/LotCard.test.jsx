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
    anoFabricacao: 2020,
    km: 50000,
    combustivel: 'GASOLINA',
    ar: 1,
    vidroEletrico: 1,
    direcao: 1,
    automatico: 1,
    manualProprietario: 0,
    kitGas: 0,
    estepe: 1,
  };

  const mockOnPress = jest.fn();

  it('deve renderizar informações básicas do lote', () => {
    const { getByText } = render(
      <LotCard lote={mockLote} onPress={mockOnPress} />
    );

    expect(getByText('FIAT UNO')).toBeTruthy();
    expect(getByText('R$ 15.000,00')).toBeTruthy();
    expect(getByText('2020')).toBeTruthy();
    expect(getByText('GASOLINA')).toBeTruthy();
    expect(getByText('50,000 km')).toBeTruthy();
  });

  it('deve exibir contador de itens corretamente', () => {
    const { getByText } = render(
      <LotCard lote={mockLote} onPress={mockOnPress} />
    );

    expect(getByText('5 itens')).toBeTruthy();
  });

  it('deve exibir contador zero quando não houver itens', () => {
    const loteSemItens = {
      ...mockLote,
      ar: 0,
      vidroEletrico: 0,
      direcao: 0,
      automatico: 0,
      manualProprietario: 0,
      kitGas: 0,
      estepe: 0,
    };

    const { getByText } = render(
      <LotCard lote={loteSemItens} onPress={mockOnPress} />
    );

    expect(getByText('0 itens')).toBeTruthy();
  });

  it('deve exibir tipo de veículo', () => {
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

    expect(getByText('Veículo não identificado')).toBeTruthy();
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
    const loteComLance = { 
      ...mockLote, 
      lance: 16000, 
      lanceFormatted: 'R$ 16.000,00' 
    };

    const { getByText } = render(
      <LotCard lote={loteComLance} onPress={mockOnPress} />
    );

    expect(getByText('R$ 16.000,00')).toBeTruthy();
  });

  it('deve exibir localização quando houver cidadeDocumento', () => {
    const loteComLocalizacao = {
      ...mockLote,
      cidadeDocumento: 'São Paulo',
    };

    const { getByText } = render(
      <LotCard lote={loteComLocalizacao} onPress={mockOnPress} />
    );

    expect(getByText('São Paulo')).toBeTruthy();
  });

  it('não deve exibir km quando for zero', () => {
    const loteSemKm = {
      ...mockLote,
      km: 0,
    };

    const { queryByText } = render(
      <LotCard lote={loteSemKm} onPress={mockOnPress} />
    );

    expect(queryByText(/km/)).toBeNull();
  });

  it('deve lidar com lote inválido', () => {
    const loteInvalido = {};

    const { getByText } = render(
      <LotCard lote={loteInvalido} onPress={mockOnPress} />
    );

    expect(getByText('Lote indisponível')).toBeTruthy();
  });
});
