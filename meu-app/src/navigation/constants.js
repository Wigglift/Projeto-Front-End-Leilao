/**
 * Constantes de navegação do aplicativo
 * Centraliza os nomes das telas
 */

export const SCREEN_NAMES = {
  // Telas de autenticação
  SPLASH: 'Splash',
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
  
  // Telas principais
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  
  // Telas de leilões
  AUCTION_DETAILS: 'AuctionDetails',
  AUCTION_LIST_FOR_LOTS: 'AuctionListForLots',
  
  // Telas de lotes
  LOT_LIST: 'LotList',
  LOT_DETAILS: 'LotDetails',
};

/**
 * Configurações padrão para as telas
 */
export const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  animation: 'slide_from_right',
};

/**
 * Configurações para telas específicas
 */
export const SPECIFIC_SCREEN_OPTIONS = {
  [SCREEN_NAMES.HOME]: {
    gestureEnabled: false,
  },
};

/**
 * Helper para obter opções de tela combinadas
 */
export const getScreenOptions = (screenName) => ({
  ...SCREEN_OPTIONS,
  ...SPECIFIC_SCREEN_OPTIONS[screenName],
});
