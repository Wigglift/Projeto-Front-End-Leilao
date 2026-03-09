import styled from "styled-components/native";
import { moderateScale, isWeb } from "../../utils/responsive";
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
  margin-bottom: ${spacing.lg}px;
  padding-top: ${isWeb ? 0 : spacing.lg}px;
  flex-wrap: nowrap;
`;

export const MenuButton = styled.TouchableOpacity`
  padding: ${spacing.sm}px;
  min-width: ${moderateScale(40)}px;
  justify-content: center;
  align-items: center;
`;

export const LocationContainer = styled.View`
  flex: 1;
  margin-left: ${spacing.sm}px;
  margin-right: ${spacing.sm}px;
  min-width: 0;
`;

export const LocationLabel = styled.Text`
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.textMuted};
  font-weight: ${typography.fontWeight.semiBold};
  text-transform: uppercase;
  flex-shrink: 1;
`;

export const LocationText = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.text};
  font-weight: ${typography.fontWeight.semiBold};
  flex-shrink: 1;
`;

export const NotificationButton = styled.TouchableOpacity`
  padding: ${spacing.xs}px;
  position: relative;
  min-width: ${moderateScale(40)}px;
  justify-content: center;
  align-items: center;
`;

export const NotificationBadge = styled.View`
  position: absolute;
  top: ${spacing.sm}px;
  right: ${spacing.sm}px;
  background-color: ${colors.error};
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.inputBackground};
  border: 1px solid ${colors.inputBorder};
  border-radius: ${borderRadius.xxl}px;
  padding: ${spacing.md}px ${spacing.base}px;
  margin-top: ${spacing.sm}px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: ${typography.fontSize.md}px;
  color: ${colors.inputText};
  margin-left: ${spacing.md}px;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  padding: ${spacing.md}px ${spacing.base}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.md}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  flex-shrink: 1;
`;

export const SeeAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const SeeAllText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.primary};
  font-weight: ${typography.fontWeight.semiBold};
  margin-right: ${spacing.xs}px;
`;

export const CategoriesContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: ${spacing.sm}px;
`;

export const AuctionsContainer = styled.View`
  padding-bottom: ${moderateScale(80)}px;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${spacing.xxl}px;
  right: ${spacing.xl}px;
  background-color: ${colors.primary};
  flex-direction: row;
  align-items: center;
  padding: ${spacing.lg}px ${spacing.xl}px;
  border-radius: ${borderRadius.round}px;
  shadow-color: ${shadows.lg.shadowColor};
  shadow-offset: ${shadows.lg.shadowOffset.width}px ${shadows.lg.shadowOffset.height}px;
  shadow-opacity: ${shadows.lg.shadowOpacity};
  shadow-radius: ${shadows.lg.shadowRadius}px;
  elevation: ${shadows.lg.elevation};
`;

export const FloatingButtonText = styled.Text`
  color: ${colors.buttonPrimaryText};
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.bold};
  margin-left: ${spacing.sm}px;
`;

export const GreetingText = styled.Text`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.textLink};
  margin-bottom: ${spacing.xs}px;
`;

export const WelcomeText = styled.Text`
  font-size: ${typography.fontSize.xxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm}px;
`;
