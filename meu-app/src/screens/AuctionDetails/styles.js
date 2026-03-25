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

export const AuctionInfo = styled.View`
  margin-bottom: ${spacing.xl}px;
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
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.textSecondary};
  flex: 1;
`;

export const InfoValue = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.text};
  flex: 2;
  text-align: right;
`;
