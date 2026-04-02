import styled from "styled-components/native";
import { colors, typography } from "../../../theme";

export const LinkButton = styled.TouchableOpacity``;

export const LinkText = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${(props) => props.color || colors.textLink};
  font-weight: ${(props) => (props.bold ? typography.fontWeight.bold : typography.fontWeight.semiBold)};
`;
