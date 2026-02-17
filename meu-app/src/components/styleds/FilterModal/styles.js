import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContainer = styled.View`
  background-color: ${theme.colors.background.secondary};
  border-top-left-radius: ${theme.borderRadius.xl}px;
  border-top-right-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  max-height: 80%;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
  padding-bottom: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

export const ModalTitle = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const FilterSection = styled.View`
  margin-bottom: ${theme.spacing.sm}px;
`;

export const FilterLabel = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
`;

export const FilterInput = styled.TextInput`
  background-color: ${theme.colors.background.input};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
  border-width: 1px;
  border-color: ${theme.colors.border.light};
`;

export const PickerContainer = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

export const PickerButton = styled.TouchableOpacity`
  background-color: ${theme.colors.background.input};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.border.light};
`;

export const PickerText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${props => props.hasValue ? theme.colors.text.primary : "#999"};
  flex: 1;
`;

export const PickerIconContainer = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.lg}px;
`;

export const ClearButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xs}px;
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${theme.colors.border.medium};
  background-color: ${theme.colors.background.secondary};
`;

export const ClearButtonText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.secondary};
`;

export const ApplyButton = styled.TouchableOpacity`
  flex: 2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xs}px;
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.primary};
  shadow-color: ${theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
`;

export const ApplyButtonText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
`;
