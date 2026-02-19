import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

export const Header = styled.View`
  padding: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.xxxl}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${theme.colors.background.secondary};
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
  bottom: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.background.secondary};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;
export const InfoCard = styled.View`
  background-color: ${theme.colors.background.secondary};
  border-top-left-radius: ${theme.borderRadius.xl}px;
  border-top-right-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  margin-top: -${theme.borderRadius.xl}px;
`;

export const ProductTitle = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

export const SellerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const SellerAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: ${theme.spacing.sm}px;
`;

export const SellerName = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.secondary};
`;

export const DescriptionSection = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const DescriptionText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  line-height: 22px;
  color: ${theme.colors.text.secondary};
`;

export const BidSection = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

export const BidInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${theme.spacing.md}px;
`;

export const BidInfoCard = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
`;

export const BidLabel = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const BidValue = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${props => props.primary ? theme.colors.primary : theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const LiveBadge = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${theme.spacing.xs}px;
`;

export const LiveDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
  margin-right: ${theme.spacing.xs}px;
`;

export const LiveText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${props => props.bold ? theme.fontWeight.semibold : theme.fontWeight.regular};
  color: ${props => props.primary ? theme.colors.primary : theme.colors.text.secondary};
`;

export const BidsCount = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-left: auto;
`;

export const BidsList = styled.View`
  margin-top: ${theme.spacing.lg}px;
`;

export const BidItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

export const BidderInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.sm}px;
`;

export const BidderAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const BidderName = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
`;

export const BidTime = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

export const BidAmount = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

export const QuickBidsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const QuickBidButton = styled.TouchableOpacity`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${props => props.selected ? theme.colors.primary : theme.colors.border.medium};
  background-color: ${props => props.selected ? theme.colors.primaryLight : theme.colors.background.secondary};
`;

export const QuickBidText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${props => props.selected ? theme.colors.primary : theme.colors.text.primary};
`;

export const CustomBidButton = styled.TouchableOpacity`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${props => props.selected ? theme.colors.text.primary : "#2d2d2d"};
`;

export const CustomBidText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.white};
`;

export const PlaceBidButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  shadow-color: ${theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
`;

export const PlaceBidText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
`;
