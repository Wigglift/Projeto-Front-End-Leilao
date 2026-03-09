import styled from "styled-components/native";
import { moderateScale } from "../../../utils/responsive";
import { colors, spacing, typography, borderRadius } from "../../../theme";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxBox = styled.View`
  width: ${moderateScale(20)}px;
  height: ${moderateScale(20)}px;
  border-width: 2px;
  border-color: ${colors.border};
  border-radius: ${borderRadius.xs}px;
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.sm}px;
`;

export const CheckboxInner = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  background-color: ${(props) => (props.checked ? colors.primary : colors.transparent)};
  border-radius: 2px;
`;

export const Label = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textSecondary};
`;
