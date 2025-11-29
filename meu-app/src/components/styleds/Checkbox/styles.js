import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxBox = styled.View`
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-color: #e0e0e0;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const CheckboxInner = styled.View`
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.checked ? "#FF6B35" : "transparent")};
  border-radius: 2px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #666666;
`;
