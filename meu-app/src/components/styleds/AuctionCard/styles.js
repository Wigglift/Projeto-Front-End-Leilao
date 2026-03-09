import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius, shadows } from "../../../theme";
import { moderateScale } from "../../../utils/responsive";

export const Container = styled.TouchableOpacity`
  background-color: ${colors.backgroundCard};
  border-radius: ${borderRadius.lg}px;
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  elevation: ${shadows.md.elevation};
`;

export const Image = styled.Image`
  width: 100%;
  height: ${moderateScale(180)}px;
  min-height: 160px;
  background-color: ${colors.backgroundSecondary};
`;

export const InfoContainer = styled.View`
  padding: ${spacing.lg}px;
`;

export const Title = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm}px;
`;

export const Description = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.md}px;
  line-height: ${typography.lineHeight.relaxed * typography.fontSize.base}px;
`;

export const CurrentBid = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.primaryDark};
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  margin-bottom: ${spacing.md}px;
`;

export const BidLabel = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
`;

export const BidValue = styled.Text`
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary};
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
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textMuted};
  margin-left: ${spacing.xs}px;
`;
