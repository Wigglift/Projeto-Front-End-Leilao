import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #1a1a2e;
`;

export const Header = styled.View`
  padding-top: 80px;
  padding-bottom: 40px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #b0b0b0;
`;

export const FormContainer = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  flex: 1;
  padding: 40px 24px;
`;

export const OptionsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const SignUpText = styled.Text`
  font-size: 14px;
  color: #666666;
`;
