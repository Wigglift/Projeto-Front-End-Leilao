import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserPhoto, getUserPhoto, removeUserPhoto } from '../userPhotoService';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('userPhotoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveUserPhoto', () => {
    it('deve salvar a URI da foto com sucesso', async () => {
      const mockUri = 'file:///path/to/photo.jpg';
      AsyncStorage.setItem.mockResolvedValue();

      const result = await saveUserPhoto(mockUri);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@user_photo', mockUri);
      expect(result).toBe(true);
    });

    it('deve retornar false em caso de erro', async () => {
      const mockUri = 'file:///path/to/photo.jpg';
      AsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));

      const result = await saveUserPhoto(mockUri);

      expect(result).toBe(false);
    });
  });

  describe('getUserPhoto', () => {
    it('deve retornar a URI da foto salva', async () => {
      const mockUri = 'file:///path/to/photo.jpg';
      AsyncStorage.getItem.mockResolvedValue(mockUri);

      const result = await getUserPhoto();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@user_photo');
      expect(result).toBe(mockUri);
    });

    it('deve retornar null se não houver foto salva', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      const result = await getUserPhoto();

      expect(result).toBeNull();
    });

    it('deve retornar null em caso de erro', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

      const result = await getUserPhoto();

      expect(result).toBeNull();
    });
  });

  describe('removeUserPhoto', () => {
    it('deve remover a foto com sucesso', async () => {
      AsyncStorage.removeItem.mockResolvedValue();

      const result = await removeUserPhoto();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@user_photo');
      expect(result).toBe(true);
    });

    it('deve retornar false em caso de erro', async () => {
      AsyncStorage.removeItem.mockRejectedValue(new Error('Storage error'));

      const result = await removeUserPhoto();

      expect(result).toBe(false);
    });
  });
});
