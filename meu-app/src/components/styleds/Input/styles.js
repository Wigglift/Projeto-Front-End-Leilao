import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 0 16px;
  height: 56px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333333;
`;

export const IconButton = styled.TouchableOpacity`
  padding: 8px;
`;
