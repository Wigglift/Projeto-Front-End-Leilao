import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius, shadows } from "../../../theme";

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

export const InfoContainer = styled.View`
  padding: ${spacing.lg}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md}px;
`;

export const TitleContainer = styled.View`
  flex: 1;
  margin-right: ${spacing.md}px;
`;

export const Title = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.xs}px;
`;

export const Subtitle = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textSecondary};
`;

export const TypeBadge = styled.View`
  background-color: ${props => props.backgroundColor || colors.primaryLight};
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-radius: ${borderRadius.sm}px;
`;

export const TypeText = styled.Text`
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${props => props.color || colors.primary};
  text-transform: uppercase;
`;

export const DetailsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${spacing.md}px;
`;

export const DetailItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${spacing.lg}px;
  margin-bottom: ${spacing.sm}px;
`;

export const DetailText = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textMuted};
  margin-left: ${spacing.xs}px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.primaryDark};
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
`;

export const PriceLabel = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
`;

export const PriceValue = styled.Text`
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary};
`;

export const LanceContainer = styled.View`
  margin-top: ${spacing.sm}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LanceLabel = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textMuted};
`;

export const LanceValue = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.success};
`;

export const ErrorContainer = styled.TouchableOpacity`
  background-color: ${colors.backgroundSecondary};
  border-radius: ${borderRadius.lg}px;
  margin-bottom: ${spacing.lg}px;
  padding: ${spacing.lg}px;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  border: 1px dashed ${colors.border};
`;

export const ErrorText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textMuted};
  font-style: italic;
`;
