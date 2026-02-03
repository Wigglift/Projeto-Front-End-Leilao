import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const LinkButton = styled.TouchableOpacity``;

export const LinkText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${(props) => props.color || theme.colors.primary};
  font-weight: ${(props) => (props.bold ? theme.fontWeight.bold : theme.fontWeight.medium)};
`;
