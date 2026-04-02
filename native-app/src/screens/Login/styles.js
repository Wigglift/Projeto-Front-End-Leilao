import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius } from "../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  padding-top: 120px;
  padding-bottom: 80px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${typography.fontSize.display}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm}px;
`;

export const Subtitle = styled.Text`
  font-size: ${typography.fontSize.md}px;
  color: ${colors.textSecondary};
`;

export const FormContainer = styled.View`
  background-color: ${colors.backgroundCard};
  border-top-left-radius: ${borderRadius.xxl}px;
  border-top-right-radius: ${borderRadius.xxl}px;
  flex: 1;
  padding: 40px ${spacing.xl}px;
`;

export const OptionsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xl}px;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${spacing.xl}px;
  margin-bottom: 8px;
`;

export const SignUpText = styled.Text`
  font-size: ${typography.fontSize.md}px;
  color: ${colors.textSecondary};
`;
