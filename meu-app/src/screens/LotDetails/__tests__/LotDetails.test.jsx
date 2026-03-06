import React from 'react';
import { render } from '@testing-library/react-native';
import LotDetails from '../index';

describe('LotDetails', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  const mockRoute = {
    params: {
      lote: {
        id: 1,
        marca: 'FIAT',
        modelo: 'UNO',
        valorInicialFormatted: 'R$ 15.000,00',
        tipo: 'MEDIA_MONTA',
        tipoVeiculo: 'CARRO',
        combustivel: 'GASOLINA',
      },
      auction: {
        id: 1,
        titulo: 'Leilão Teste',
      },
    },
  };

  it('deve renderizar os detalhes do lote', () => {
    const { getByText } = render(
      <LotDetails navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('FIAT UNO')).toBeTruthy();
    expect(getByText('R$ 15.000,00')).toBeTruthy();
  });

  it('deve exibir informações do veículo', () => {
    const { getByText } = render(
      <LotDetails navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('GASOLINA')).toBeTruthy();
  });

  it('deve exibir badge do tipo', () => {
    const { getByText } = render(
      <LotDetails navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('MÉDIA MONTA')).toBeTruthy();
  });

  it('deve exibir ID do lote', () => {
    const { getByText } = render(
      <LotDetails navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('#1')).toBeTruthy();
  });

  it('deve exibir botão Dar Lance', () => {
    const { getByText } = render(
      <LotDetails navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Dar Lance')).toBeTruthy();
  });
});
