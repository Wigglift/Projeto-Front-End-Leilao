import styled from "styled-components/native";
import { moderateScale } from "../../utils/responsive";
import { colors, spacing, typography, borderRadius, shadows } from "../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  background-color: ${colors.backgroundSecondary};
  padding: ${spacing.xl}px ${spacing.base}px ${spacing.lg}px;
  shadow-color: ${shadows.sm.shadowColor};
  shadow-offset: ${shadows.sm.shadowOffset.width}px ${shadows.sm.shadowOffset.height}px;
  shadow-opacity: ${shadows.sm.shadowOpacity};
  shadow-radius: ${shadows.sm.shadowRadius}px;
  elevation: ${shadows.sm.elevation};
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${spacing.lg}px;
  margin-bottom: ${spacing.md}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  min-width: 40px;
  min-height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.backgroundCard};
  border-radius: ${moderateScale(22)}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.fontSize.xxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  flex: 1;
  text-align: center;
  margin: 0 ${spacing.md}px;
`;

export const FilterButton = styled.TouchableOpacity`
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  min-width: 40px;
  min-height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.backgroundCard};
  border-radius: ${moderateScale(22)}px;
  position: relative;
`;

export const FilterBadge = styled.View`
  position: absolute;
  top: ${spacing.xs}px;
  right: ${spacing.xs}px;
  background-color: ${colors.error};
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
`;

export const AuctionInfo = styled.View`
  margin-bottom: ${spacing.md}px;
`;

export const AuctionTitle = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text};
  margin-bottom: ${spacing.xs}px;
`;

export const AuctionSubtitle = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textSecondary};
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const ListContainer = styled.View`
  padding: ${spacing.base}px;
  padding-bottom: ${moderateScale(80)}px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${spacing.xxl}px;
  min-height: 300px;
`;

export const EmptyText = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  color: ${colors.textMuted};
  text-align: center;
  margin-top: ${spacing.lg}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;
