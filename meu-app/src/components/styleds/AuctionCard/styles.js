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
  height: ${moderateScale(100)}px;
  min-height: 90px;
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
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.sm}px;
`;

export const MetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.xs}px;
`;

export const MetaItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
`;

export const MetaText = styled.Text`
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.textMuted};
`;

export const InfoValue = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text};
`;
