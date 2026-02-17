import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const Container = styled.TouchableOpacity`
  background-color: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
  overflow: hidden;
  shadow-color: ${theme.shadows.medium.shadowColor};
  shadow-offset: ${theme.shadows.medium.shadowOffset.width}px ${theme.shadows.medium.shadowOffset.height}px;
  shadow-opacity: ${theme.shadows.medium.shadowOpacity};
  shadow-radius: ${theme.shadows.medium.shadowRadius}px;
`;

export const Image = styled.Image`
  width: 100%;
  height: ${theme.componentHeight.card}px;
  background-color: ${theme.colors.background.input};
`;

export const InfoContainer = styled.View`
  padding: ${theme.spacing.lg}px;
`;

export const Title = styled.Text`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const Description = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md}px;
  line-height: ${theme.fontSize.xxl}px;
`;

export const CurrentBid = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.primaryLight};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const BidLabel = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
`;

export const BidValue = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const FooterItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FooterText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.spacing.xs + 2}px;
`;
