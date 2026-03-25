import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Login from '../index';

const mockSignIn = jest.fn();

jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({ signIn: mockSignIn }),
}));

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
    expect(getByText('BidLive')).toBeTruthy();
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

  it('deve chamar signIn com as credenciais corretas', async () => {
    mockSignIn.mockResolvedValue({ token: 'mock-token' });

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Digite seu usuário...'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha...'), 'password123');

    await act(async () => {
      fireEvent.press(getByText('Entrar'));
    });

    expect(mockSignIn).toHaveBeenCalledWith('testuser', 'password123');
  });

  it('deve mostrar mensagem de erro em caso de falha no login', async () => {
    mockSignIn.mockRejectedValue(new Error('Credenciais inválidas'));

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Digite seu usuário...'), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha...'), 'wrongpass');

    await act(async () => {
      fireEvent.press(getByText('Entrar'));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro no Login',
      expect.any(String)
    );
  });

  it('deve alternar o checkbox "Lembrar de mim"', () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);

    const checkbox = getByText('Lembrar de mim');
    fireEvent.press(checkbox);

    expect(checkbox).toBeTruthy();
  });

  it('deve mostrar estado de carregamento durante o login', async () => {
    let resolveSignIn;
    mockSignIn.mockImplementation(
      () => new Promise((resolve) => { resolveSignIn = resolve; })
    );

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Digite seu usuário...'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha...'), 'password123');
    fireEvent.press(getByText('Entrar'));

    expect(getByText('Entrando...')).toBeTruthy();

    await act(async () => { resolveSignIn(); });
  });
});
