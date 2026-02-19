import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_API_URL = "http://ec2-3-20-227-42.us-east-2.compute.amazonaws.com:3000";
const TOKEN_KEY = "@leilao_token";
const TOKEN_EXPIRY_KEY = "@leilao_token_expiry";

/**
 * Service para gerenciar autenticação
 */
const authService = {
  /**
   * Realiza login e armazena o token
   * @param {string} username - Nome de usuário
   * @param {string} password - Senha
   * @returns {Promise<Object>} - Dados do login com token
   */
  async login(username, password) {
    try {
      const response = await axios.post(
        `${AUTH_API_URL}/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const { accessToken } = response.data;

      if (accessToken) {
        await this.saveToken(accessToken);
        return { success: true, token: accessToken };
      }

      throw new Error("Token não recebido");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response) {
        throw new Error(
          error.response.data?.message || "Credenciais inválidas"
        );
      } else if (error.request) {
        throw new Error("Erro de conexão - verifique sua internet");
      }
      throw error;
    }
  },

  /**
   * Salva o token e define tempo de expiração (2 horas)
   * @param {string} token - Token JWT
   */
  async saveToken(token) {
    try {
      const expiryTime = Date.now() + 2 * 60 * 60 * 1000; // 2 horas
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    } catch (error) {
      console.error("Erro ao salvar token:", error);
      throw error;
    }
  },

  /**
   * Recupera o token armazenado se ainda for válido
   * @returns {Promise<string|null>} - Token ou null se expirado/inexistente
   */
  async getToken() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const expiry = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);

      if (!token || !expiry) {
        return null;
      }

      if (Date.now() > parseInt(expiry)) {
        await this.clearToken();
        return null;
      }

      return token;
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
      return null;
    }
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {Promise<boolean>} - True se autenticado
   */
  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  },

  /**
   * Remove o token (logout)
   */
  async clearToken() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(TOKEN_EXPIRY_KEY);
    } catch (error) {
      console.error("Erro ao limpar token:", error);
      throw error;
    }
  },

  /**
   * Faz logout do usuário
   */
  async logout() {
    await this.clearToken();
  },
};

export default authService;
