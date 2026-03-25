import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PHOTO_KEY = '@user_photo';

/**
 * Salva a URI da foto do usuário no AsyncStorage
 * @param {string} photoUri - URI da foto
 */
export const saveUserPhoto = async (photoUri) => {
  try {
    await AsyncStorage.setItem(USER_PHOTO_KEY, photoUri);
    return true;
  } catch (error) {
    console.error('Erro ao salvar foto do usuário:', error);
    return false;
  }
};

/**
 * Obtém a URI da foto do usuário do AsyncStorage
 * @returns {Promise<string|null>} URI da foto ou null se não existir
 */
export const getUserPhoto = async () => {
  try {
    const photoUri = await AsyncStorage.getItem(USER_PHOTO_KEY);
    return photoUri;
  } catch (error) {
    console.error('Erro ao obter foto do usuário:', error);
    return null;
  }
};

/**
 * Remove a foto do usuário do AsyncStorage
 */
export const removeUserPhoto = async () => {
  try {
    await AsyncStorage.removeItem(USER_PHOTO_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao remover foto do usuário:', error);
    return false;
  }
};
