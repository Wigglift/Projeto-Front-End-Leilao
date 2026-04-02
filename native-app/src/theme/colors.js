/**
 * Paleta de Cores - BidLive
 */

import { Platform } from 'react-native';

export const colors = {
  // ========================================
  // CORES PRINCIPAIS
  // ========================================
  primary: '#5A9FD4',
  primaryDark: '#2C5F7F',
  primaryLight: '#7BB3E0',
  accent: '#4A8FBF',

  // ========================================
  // BACKGROUNDS
  // ========================================
  background: '#0A1929',
  backgroundCard: '#13202E',
  backgroundSecondary: '#0D1F2D',
  backgroundOverlay: 'rgba(10, 25, 41, 0.95)',

  // ========================================
  // TEXTOS
  // ========================================
  text: '#FFFFFF',
  textSecondary: '#B0C4DE',
  textMuted: '#6B8299',
  textLink: '#5A9FD4',
  textDisabled: '#3A4A5A',

  // ========================================
  // BORDAS E DIVISORES
  // ========================================
  border: '#2A3F54',
  borderLight: '#1A2F3F',
  divider: '#1A2F3F',

  // ========================================
  // STATUS E FEEDBACK
  // ========================================
  success: '#4CAF50',
  successLight: 'rgba(76, 175, 80, 0.2)',
  error: '#F44336',
  errorLight: 'rgba(244, 67, 54, 0.2)',
  warning: '#FF9800',
  info: '#2196F3',

  // ========================================
  // BOTÕES
  // ========================================
  buttonPrimary: Platform.OS === 'ios' ? '#5A9FD4' : '#43A047',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: 'transparent',
  buttonSecondaryBorder: '#5A9FD4',
  buttonSecondaryText: '#5A9FD4',
  buttonDisabled: '#2A3F54',

  // ========================================
  // INPUTS
  // ========================================
  inputBackground: '#13202E',
  inputBorder: '#2A3F54',
  inputBorderFocus: '#5A9FD4',
  inputText: '#FFFFFF',
  inputPlaceholder: '#6B8299',
  inputLabel: '#B0C4DE',
  inputIcon: '#5A9FD4',

  // ========================================
  // AVATAR E PERFIL
  // ========================================
  avatarBackground: '#2C5F7F',
  avatarIcon: '#5A9FD4',
  profileCard: '#13202E',

  // ========================================
  // OUTROS
  // ========================================
  shadow: 'rgba(0, 0, 0, 0.3)',
  transparent: 'transparent',
};
