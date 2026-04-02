import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius } from "../../../theme";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.selected ? colors.primary : colors.backgroundCard)};
  border: 1px solid ${(props) => (props.selected ? colors.primary : colors.border)};
  border-radius: ${borderRadius.round}px;
  padding: ${spacing.md}px ${spacing.lg}px;
  margin-right: ${spacing.md}px;
`;

export const IconContainer = styled.View`
  margin-right: ${spacing.sm}px;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${(props) => (props.selected ? colors.buttonPrimaryText : colors.textSecondary)};
`;
