import styled from "styled-components/native";
import { moderateScale } from "../../utils/responsive";
import { colors, spacing, typography, borderRadius, shadows } from "../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  height: 60px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: ${spacing.base}px;
  top: ${spacing.base}px;
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  min-width: 40px;
  min-height: 40px;
  background-color: ${colors.backgroundCard};
  border-radius: ${moderateScale(22)}px;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const InfoCard = styled.View`
  background-color: ${colors.backgroundCard};
  padding: ${spacing.xl}px;
  margin: ${spacing.base}px;
  border-radius: ${borderRadius.lg}px;
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  elevation: ${shadows.md.elevation};
`;

export const TitleSection = styled.View`
  margin-bottom: ${spacing.lg}px;
`;

export const LotTitle = styled.Text`
  font-size: ${typography.fontSize.xxxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm}px;
`;

export const LotSubtitle = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
`;

export const TypeBadge = styled.View`
  align-self: flex-start;
  background-color: ${props => props.backgroundColor || colors.primaryLight};
  padding: ${spacing.sm}px ${spacing.base}px;
  border-radius: ${borderRadius.md}px;
  margin-top: ${spacing.sm}px;
`;

export const TypeText = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${props => props.color || colors.primary};
  text-transform: uppercase;
`;

export const SectionTitle = styled.Text`
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.lg}px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const InfoLabel = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
  flex: 1;
`;

export const InfoValue = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text};
  flex: 1;
  text-align: right;
`;

export const PriceSection = styled.View`
  background-color: ${colors.primaryDark};
  padding: ${spacing.xl}px;
  border-radius: ${borderRadius.lg}px;
  margin: ${spacing.lg}px 0;
`;

export const PriceLabel = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.sm}px;
`;

export const PriceValue = styled.Text`
  font-size: ${typography.fontSize.xxxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary};
`;

export const LanceSection = styled.View`
  margin-top: ${spacing.md}px;
  padding-top: ${spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${colors.border};
`;

export const LanceLabel = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textMuted};
  margin-bottom: ${spacing.xs}px;
`;

export const LanceValue = styled.Text`
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.success};
`;

export const FeaturesSection = styled.View`
  margin-top: ${spacing.lg}px;
`;

export const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.md}px 0;
`;

export const FeatureIcon = styled.View`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${props => props.available ? colors.successLight : colors.errorLight};
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md}px;
`;

export const FeatureText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.text};
  flex: 1;
`;

export const ButtonContainer = styled.View`
  padding: ${spacing.base}px;
  padding-bottom: ${spacing.xl}px;
`;

export const BidButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.lg}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  elevation: ${shadows.md.elevation};
`;

export const BidButtonText = styled.Text`
  color: ${colors.buttonPrimaryText};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  margin-left: ${spacing.sm}px;
`;
