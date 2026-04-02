import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../authService';
import axios from 'axios';

jest.mock('axios');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
  });

  describe('login', () => {
    it('deve fazer login com sucesso e armazenar o token', async () => {
      const mockResponse = {
        data: {
          accessToken: 'mock-token-123',
        },
      };
      axios.post = jest.fn().mockResolvedValue(mockResponse);

      await authService.login('testuser', 'password123');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@leilao_token', 'mock-token-123');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@leilao_token_expiry',
        expect.any(String)
      );
    });

    it('deve lançar erro quando o login falha', async () => {
      axios.post = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

      await expect(authService.login('wronguser', 'wrongpass')).rejects.toThrow();
    });
  });

  describe('logout', () => {
    it('deve limpar o token armazenado', async () => {
      await authService.logout();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@leilao_token');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@leilao_token_expiry');
    });
  });

  describe('getToken', () => {
    it('deve retornar o token se não estiver expirado', async () => {
      const futureTime = Date.now() + 3600000;
      AsyncStorage.getItem.mockImplementation((key) => {
        if (key === '@leilao_token') return Promise.resolve('valid-token');
        if (key === '@leilao_token_expiry') return Promise.resolve(futureTime.toString());
        return Promise.resolve(null);
      });

      const token = await authService.getToken();
      expect(token).toBe('valid-token');
    });

    it('deve retornar null se o token estiver expirado', async () => {
      const pastTime = Date.now() - 3600000;
      AsyncStorage.getItem.mockImplementation((key) => {
        if (key === '@leilao_token') return Promise.resolve('expired-token');
        if (key === '@leilao_token_expiry') return Promise.resolve(pastTime.toString());
        return Promise.resolve(null);
      });

      const token = await authService.getToken();
      expect(token).toBeNull();
    });
  });
});
