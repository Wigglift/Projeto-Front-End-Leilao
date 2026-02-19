import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

export const ModalContainer = styled.View`
  background-color: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xxxl}px ${theme.spacing.xl}px;
  width: 100%;
  max-width: 400px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
`;

export const IconContainer = styled.View`
  position: relative;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const MoneyIcon = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #E8F5E9;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: #4CAF50;
`;

export const CheckIcon = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${theme.colors.background.secondary};
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: #4CAF50;
`;

export const ModalTitle = styled.Text`
  font-size: ${theme.fontSize.xxxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
  text-align: center;
`;

export const ModalMessage = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 22px;
  margin-bottom: ${theme.spacing.xxl}px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
  shadow-color: ${theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
`;

export const CancelButton = styled.TouchableOpacity`
  width: 100%;
  background-color: transparent;
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.border.medium};
`;

export const CancelButtonText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;
