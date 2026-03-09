import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius, shadows } from "../../theme";
import { moderateScale } from "../../utils/responsive";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  padding: ${spacing.base}px;
  padding-top: ${spacing.xxxl}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.backgroundCard};
  border-radius: ${moderateScale(22)}px;
  min-width: 40px;
  min-height: 40px;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${colors.backgroundSecondary};
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ExpandButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${spacing.lg}px;
  right: ${spacing.lg}px;
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  min-width: 40px;
  min-height: 40px;
  background-color: ${colors.backgroundCard};
  border-radius: ${moderateScale(22)}px;
  justify-content: center;
  align-items: center;
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  elevation: ${shadows.md.elevation};
`;
export const InfoCard = styled.View`
  background-color: ${colors.backgroundCard};
  border-top-left-radius: ${borderRadius.xl}px;
  border-top-right-radius: ${borderRadius.xl}px;
  padding: ${spacing.xl}px;
  margin-top: -${borderRadius.xl}px;
`;

export const ProductTitle = styled.Text`
  font-size: ${typography.fontSize.xxxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
`;

export const SellerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.lg}px;
`;

export const SellerAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: ${spacing.sm}px;
`;

export const SellerName = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.textSecondary};
`;

export const DescriptionSection = styled.View`
  margin-bottom: ${spacing.xl}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.primary};
  margin-bottom: ${spacing.sm}px;
`;

export const DescriptionText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  line-height: 22px;
  color: ${colors.textSecondary};
`;

export const BidSection = styled.View`
  margin-bottom: ${spacing.xl}px;
`;

export const BidInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${spacing.md}px;
`;

export const BidInfoCard = styled.View`
  flex: 1;
  background-color: ${colors.backgroundSecondary};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
`;

export const BidLabel = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textMuted};
  margin-bottom: ${spacing.xs}px;
`;

export const BidValue = styled.Text`
  font-size: ${typography.fontSize.xxxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${props => props.primary ? colors.primary : colors.text};
  margin-bottom: ${spacing.xs}px;
`;

export const LiveBadge = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${spacing.xs}px;
`;

export const LiveDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${colors.success};
  margin-right: ${spacing.xs}px;
`;

export const LiveText = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${props => props.bold ? typography.fontWeight.semiBold : typography.fontWeight.regular};
  color: ${props => props.primary ? colors.primary : colors.textSecondary};
`;

export const BidsCount = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textSecondary};
  margin-left: auto;
`;

export const BidsList = styled.View`
  margin-top: ${spacing.lg}px;
`;

export const BidItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const BidderInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const BidderAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const BidderName = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text};
`;

export const BidTime = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textMuted};
`;

export const BidAmount = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text};
`;

export const QuickBidsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.sm}px;
  margin-bottom: ${spacing.lg}px;
`;

export const QuickBidButton = styled.TouchableOpacity`
  padding: ${spacing.md}px ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  border-width: 1px;
  border-color: ${props => props.selected ? colors.primary : colors.border};
  background-color: ${props => props.selected ? colors.primaryLight : colors.backgroundSecondary};
`;

export const QuickBidText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${props => props.selected ? colors.primary : colors.text};
`;

export const CustomBidButton = styled.TouchableOpacity`
  padding: ${spacing.md}px ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  background-color: ${props => props.selected ? colors.text : colors.backgroundSecondary};
`;

export const CustomBidText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text};
`;

export const PlaceBidButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  align-items: center;
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  elevation: ${shadows.md.elevation};
`;

export const PlaceBidText = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: #FFFFFF;
`;

export const ViewLotsButton = styled.TouchableOpacity`
  background-color: ${colors.backgroundCard};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border: 1px solid ${colors.primary};
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;
`;

export const ViewLotsText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.primary};
  margin-left: ${spacing.sm}px;
`;
