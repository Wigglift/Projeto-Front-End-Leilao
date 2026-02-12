import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const Container = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.background.input};
  border-radius: ${theme.borderRadius.md}px;
  padding: 0 ${theme.spacing.lg}px;
  height: ${theme.componentHeight.input}px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  font-size: ${theme.fontSize.lg}px;
  color: ${theme.colors.text.primary};
`;

export const IconButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;
