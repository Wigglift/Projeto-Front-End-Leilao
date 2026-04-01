import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_USERS_KEY = "@leilao_local_users";
const LOCAL_TOKEN_PREFIX = "local_user_";

/**
 * Serviço para gerenciar usuários cadastrados localmente
 */
const localUserService = {
  /**
   * Recupera todos os usuários locais armazenados
   * @returns {Promise<Array>} - Array de usuários
   */
  async getUsers() {
    try {
      const data = await AsyncStorage.getItem(LOCAL_USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao recuperar usuários locais:", error);
      return [];
    }
  },

  /**
   * Cadastra um novo usuário localmente com validações
   * @param {string} username - Nome de usuário
   * @param {string} email - E-mail
   * @param {string} password - Senha
   * @returns {Promise<Object>} - Usuário criado
   */
  async registerUser(username, email, password) {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedUsername || trimmedUsername.length < 3) {
      throw new Error("Nome de usuário deve ter pelo menos 3 caracteres");
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      throw new Error("E-mail inválido");
    }

    if (!password || password.length < 6) {
      throw new Error("Senha deve ter pelo menos 6 caracteres");
    }

    const users = await this.getUsers();

    const existingUser = users.find(
      (u) => u.username === trimmedUsername || u.email === trimmedEmail
    );

    if (existingUser) {
      throw new Error("Usuário ou e-mail já cadastrado");
    }

    const newUser = {
      username: trimmedUsername,
      email: trimmedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await AsyncStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));

    return newUser;
  },

  /**
   * Busca um usuário local por username e senha
   * @param {string} username - Nome de usuário
   * @param {string} password - Senha
   * @returns {Promise<Object|null>} - Usuário encontrado ou null
   */
  async findUser(username, password) {
    try {
      const users = await this.getUsers();
      return (
        users.find((u) => u.username === username && u.password === password) ||
        null
      );
    } catch (error) {
      console.error("Erro ao buscar usuário local:", error);
      return null;
    }
  },

  /**
   * Gera um token local para o usuário
   * @param {string} username - Nome de usuário
   * @returns {string} - Token local
   */
  generateToken(username) {
    return `${LOCAL_TOKEN_PREFIX}${username}_${Date.now()}`;
  },

  /**
   * Verifica se um token é de autenticação local
   * @param {string} token - Token a verificar
   * @returns {boolean}
   */
  isLocalToken(token) {
    return typeof token === "string" && token.startsWith(LOCAL_TOKEN_PREFIX);
  },
};

export default localUserService;
