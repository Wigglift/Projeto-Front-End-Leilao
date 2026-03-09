import styled from "styled-components/native";
import { colors, spacing, borderRadius, typography, shadows } from "../../../theme";

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  padding: ${spacing.xl}px;
`;

export const ModalContainer = styled.View`
  background-color: ${colors.backgroundCard};
  border-radius: ${borderRadius.xl}px;
  padding: ${spacing.xxxl}px ${spacing.xl}px;
  width: 100%;
  max-width: 400px;
  align-items: center;
  shadow-color: ${shadows.lg.shadowColor};
  shadow-offset: ${shadows.lg.shadowOffset.width}px ${shadows.lg.shadowOffset.height}px;
  shadow-opacity: ${shadows.lg.shadowOpacity};
  shadow-radius: ${shadows.lg.shadowRadius}px;
  elevation: ${shadows.lg.elevation};
`;

export const IconContainer = styled.View`
  position: relative;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.xl}px;
`;

export const MoneyIcon = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: rgba(76, 175, 80, 0.15);
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${colors.success};
`;

export const CheckIcon = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${colors.backgroundCard};
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${colors.success};
`;

export const ModalTitle = styled.Text`
  font-size: ${typography.fontSize.xxxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
  text-align: center;
`;

export const ModalMessage = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
  text-align: center;
  line-height: 22px;
  margin-bottom: ${spacing.xxl}px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.primary};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  align-items: center;
  margin-bottom: ${spacing.md}px;
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  elevation: ${shadows.md.elevation};
`;

export const ConfirmButtonText = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: #FFFFFF;
`;

export const CancelButton = styled.TouchableOpacity`
  width: 100%;
  background-color: transparent;
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const CancelButtonText = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text};
`;
