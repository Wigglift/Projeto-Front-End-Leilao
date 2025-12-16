import styled from "styled-components/native";

export const LinkButton = styled.TouchableOpacity``;

export const LinkText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "bold" : "500")};
`;
