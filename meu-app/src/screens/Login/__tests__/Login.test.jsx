import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Login from '../index';
import authService from '../../../services/authService';

jest.mock('../../../services/authService');
jest.spyOn(Alert, 'alert');

describe('Tela de Login', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário de login corretamente', () => {
    const { getByPlaceholderText, getByText } = render(
      <Login navigation={mockNavigation} />
    );

    expect(getByPlaceholderText('Digite seu usuário...')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua senha...')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
    expect(getByText('Sistema de Leilão')).toBeTruthy();
  });

  it('deve mostrar erro quando os campos estão vazios', async () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);

    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Erro',
        'Por favor, preencha todos os campos'
      );
    });
  });

  it('deve chamar authService.login com credenciais corretas', async () => {
    authService.login.mockResolvedValue({ token: 'mock-token' });

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Digite seu usuário...'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha...'), 'password123');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('testuser', 'password123');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    });
  });

  it('deve mostrar mensagem de erro em caso de falha no login', async () => {
    authService.login.mockRejectedValue(new Error('Credenciais inválidas'));

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Digite seu usuário...'), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha...'), 'wrongpass');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Erro no Login',
        expect.any(String)
      );
    });
  });

  it('deve alternar o checkbox "Lembrar de mim"', () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);

    const checkbox = getByText('Lembrar de mim');
    fireEvent.press(checkbox);

    expect(checkbox).toBeTruthy();
  });

  it('deve mostrar estado de carregamento durante o login', async () => {
    authService.login.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Digite seu usuário...'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha...'), 'password123');
    fireEvent.press(getByText('Entrar'));

    expect(getByText('Entrando...')).toBeTruthy();
  });
});
