import styled from "styled-components/native";
import theme from "../../../styles/theme";
import { moderateScale } from "../../../utils/responsive";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxBox = styled.View`
  width: ${moderateScale(20)}px;
  height: ${moderateScale(20)}px;
  border-width: 2px;
  border-color: ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.xs}px;
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.sm}px;
`;

export const CheckboxInner = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  background-color: ${(props) => (props.checked ? theme.colors.primary : theme.colors.transparent)};
  border-radius: 2px;
`;

export const Label = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
`;
