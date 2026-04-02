import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius } from "../../../theme";

export const Container = styled.View`
  margin-bottom: ${spacing.base}px;
`;

export const Label = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.inputLabel};
  margin-bottom: ${spacing.sm}px;
  text-transform: uppercase;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.inputBackground};
  border: 1px solid ${colors.inputBorder};
  border-radius: ${borderRadius.md}px;
  padding: 0 ${spacing.base}px;
  height: 56px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  font-size: ${typography.fontSize.md}px;
  color: ${colors.inputText};
`;

export const IconButton = styled.TouchableOpacity`
  padding: ${spacing.sm}px;
`;
