/**
 * Theme - BidLive
 * 
 * Arquivo central que exporta todas as definições de tema.
 */

import { colors } from './colors';
import { typography } from './typography';

// ========================================
// ESPAÇAMENTOS
// ========================================
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
};

// ========================================
// BORDER RADIUS
// ========================================
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 9999,
};

// ========================================
// SHADOWS
// ========================================
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
};

// ========================================
// OPACITY
// ========================================
export const opacity = {
  transparent: 0,
  light: 0.1,
  medium: 0.5,
  high: 0.8,
  opaque: 1,
};

// ========================================
// Z-INDEX
// ========================================
export const zIndex = {
  base: 1,
  dropdown: 10,
  sticky: 100,
  modal: 1000,
  overlay: 1100,
  toast: 2000,
};

// ========================================
// DURATIONS (ANIMAÇÕES)
// ========================================
export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// ========================================
// EXPORTAÇÃO DEFAULT
// ========================================
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  opacity,
  zIndex,
  duration,
};

export { colors, typography };
