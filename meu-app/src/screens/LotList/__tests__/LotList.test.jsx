import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import LotList from '../index';
import lotService from '../../../services/lotService';

jest.mock('../../../services/lotService');

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  
  const MockGestureDetector = ({ children }) => children;
  const MockGestureHandlerRootView = ({ children }) => children;
  
  const MockGesture = {
    Pan: () => ({
      minDistance: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
    }),
  };
  
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: (component) => component,
    Directions: {},
    GestureHandlerRootView: MockGestureHandlerRootView,
    GestureDetector: MockGestureDetector,
    Gesture: MockGesture,
  };
});

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

  it('deve renderizar a tela com informações do leilão', async () => {
    lotService.getLotesByLeilao.mockResolvedValue([]);

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText('Lotes')).toBeTruthy();
      expect(getByText('Leilão Teste')).toBeTruthy();
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

  it('deve carregar lotes do leilão com filtros vazios', async () => {
    lotService.getLotesByLeilao.mockResolvedValue([]);

    render(<LotList navigation={mockNavigation} route={mockRoute} />);

    await waitFor(() => {
      expect(lotService.getLotesByLeilao).toHaveBeenCalledWith(1, {});
    });
  });

  it('deve exibir contador de lotes corretamente', async () => {
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

  it('deve exibir contador singular quando houver apenas um lote', async () => {
    const mockLotes = [
      { id: 1, marca: 'FIAT', modelo: 'UNO', valorInicialFormatted: 'R$ 15.000,00' },
    ];

    lotService.getLotesByLeilao.mockResolvedValue(mockLotes);

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText('1 lote disponível')).toBeTruthy();
    });
  });

  it('deve navegar para detalhes do lote quando pressionado', async () => {
    const mockLotes = [
      { id: 1, marca: 'FIAT', modelo: 'UNO', valorInicialFormatted: 'R$ 15.000,00' },
    ];

    lotService.getLotesByLeilao.mockResolvedValue(mockLotes);

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText('FIAT UNO')).toBeTruthy();
    });

    // Simular clique no LotCard
    fireEvent.press(getByText('FIAT UNO'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('LotDetails', {
      lote: mockLotes[0],
      auction: mockRoute.params.auction,
    });
  });

  it('deve lidar com erro no carregamento de lotes', async () => {
    lotService.getLotesByLeilao.mockRejectedValue(new Error('Erro de rede'));

    const { getByText } = render(
      <LotList navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText('Lotes')).toBeTruthy();
    });

    expect(getByText(/Nenhum lote disponível/)).toBeTruthy();
  });
});
