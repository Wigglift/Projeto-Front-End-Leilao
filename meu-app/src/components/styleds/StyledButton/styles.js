import styled from 'styled-components/native';
import { colors, typography, spacing, borderRadius } from '../../../theme';

export const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => {
    if (props.disabled) return colors.buttonDisabled;
    if (props.variant === 'secondary') return colors.buttonSecondary;
    return colors.buttonPrimary;
  }};
  border: 1px solid ${(props) => {
    if (props.variant === 'secondary') return colors.buttonSecondaryBorder;
    return 'transparent';
  }};
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.base}px;
  min-height: 56px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: ${typography.styles.button.fontSize}px;
  font-weight: ${typography.styles.button.fontWeight};
  color: ${(props) => {
    if (props.variant === 'secondary') return colors.buttonSecondaryText;
    return colors.buttonPrimaryText;
  }};
`;

export const IconWrapper = styled.View`
  margin-right: ${(props) => (props.hasText ? spacing.sm : 0)}px;
`;
