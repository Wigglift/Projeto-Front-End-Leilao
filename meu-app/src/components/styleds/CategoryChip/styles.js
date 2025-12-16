import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#ff6b35" : "#f5f5f5")};
  border-radius: 25px;
  padding: 12px 20px;
  margin-right: 12px;
`;

export const Icon = styled.Text`
  font-size: 24px;
  margin-right: 8px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.selected ? "#ffffff" : "#333333")};
`;
