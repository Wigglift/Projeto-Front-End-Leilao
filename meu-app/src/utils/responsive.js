import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensões base para design (iPhone 11/12/13)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Breakpoints
export const BREAKPOINTS = {
  SMALL: 375,
  MEDIUM: 768,
  LARGE: 1024,
};

// Detecta o tipo de dispositivo
export const isSmallDevice = SCREEN_WIDTH < BREAKPOINTS.SMALL;
export const isTablet = SCREEN_WIDTH >= BREAKPOINTS.MEDIUM;
export const isLargeTablet = SCREEN_WIDTH >= BREAKPOINTS.LARGE;

/**
 * Escala horizontal baseada na largura da tela
 * @param {number} size - Tamanho em pixels do design base
 * @returns {number} - Tamanho escalado
 */
export const horizontalScale = (size) => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Escala vertical baseada na altura da tela
 * @param {number} size - Tamanho em pixels do design base
 * @returns {number} - Tamanho escalado
 */
export const verticalScale = (size) => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Escala moderada - usa um fator de moderação para não escalar demais
 * Ideal para fontes e espaçamentos
 * @param {number} size - Tamanho em pixels do design base
 * @param {number} factor - Fator de moderação (padrão: 0.5)
 * @returns {number} - Tamanho escalado moderadamente
 */
export const moderateScale = (size, factor = 0.5) => {
  return size + (horizontalScale(size) - size) * factor;
};

/**
 * Escala de fonte com ajuste para diferentes densidades de pixel
 * @param {number} size - Tamanho da fonte
 * @returns {number} - Tamanho de fonte escalado
 */
export const fontScale = (size) => {
  const scale = moderateScale(size);
  const newSize = size * PixelRatio.getFontScale();
  return Math.round(PixelRatio.roundToNearestPixel(Math.min(scale, newSize)));
};

/**
 * Retorna valor baseado no tamanho da tela
 * @param {Object} sizes - Objeto com tamanhos para small, medium, large
 * @returns {any} - Valor apropriado para o tamanho da tela
 */
export const responsiveSize = (sizes) => {
  if (isLargeTablet && sizes.large !== undefined) return sizes.large;
  if (isTablet && sizes.medium !== undefined) return sizes.medium;
  if (isSmallDevice && sizes.small !== undefined) return sizes.small;
  return sizes.default || sizes.medium || sizes.small;
};

/**
 * Dimensões da tela
 */
export const dimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmall: isSmallDevice,
  isTablet,
  isLargeTablet,
};

// Atalhos para escala comum (para facilitar uso)
export const wp = (percentage) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage) => (SCREEN_HEIGHT * percentage) / 100;

// Helpers de espaçamento responsivo
export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xxxl: moderateScale(32),
};

// Helpers de tamanhos de fonte responsivos
export const fontSize = {
  xs: fontScale(10),
  sm: fontScale(12),
  md: fontScale(14),
  lg: fontScale(16),
  xl: fontScale(18),
  xxl: fontScale(20),
  xxxl: fontScale(24),
  heading: fontScale(28),
  display: fontScale(32),
};

// Helpers de border radius responsivo
export const borderRadius = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(20),
  full: moderateScale(999),
};

// Helpers de altura de componentes
export const componentHeight = {
  button: moderateScale(56),
  input: moderateScale(56),
  card: moderateScale(180),
  header: moderateScale(60),
};

// Helpers de plataforma
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
