import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: #1a1a2e;
`;

export const Header = styled.View`
  padding-top: 120px;
  padding-bottom: 80px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${theme.fontSize.display}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const Subtitle = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: #b0b0b0;
`;

export const FormContainer = styled.View`
  background-color: ${theme.colors.background.secondary};
  border-top-left-radius: ${theme.borderRadius.full}px;
  border-top-right-radius: ${theme.borderRadius.full}px;
  flex: 1;
  padding: 40px ${theme.spacing.xxl}px;
`;

export const OptionsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl}px;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.xxl}px;
  margin-bottom: 8px;
`;

export const SignUpText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
`;
