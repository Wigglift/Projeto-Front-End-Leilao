import styled from "styled-components/native";
import theme from "../../styles/theme";
import { moderateScale, isWeb } from "../../utils/responsive";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

export const Header = styled.View`
  background-color: ${theme.colors.background.secondary};
  padding: ${theme.spacing.xxl}px ${theme.spacing.xl}px ${theme.spacing.lg}px;
  shadow-color: ${theme.shadows.small.shadowColor};
  shadow-offset: ${theme.shadows.small.shadowOffset.width}px ${theme.shadows.small.shadowOffset.height}px;
  shadow-opacity: ${theme.shadows.small.shadowOpacity};
  shadow-radius: ${theme.shadows.small.shadowRadius}px;
  elevation: ${theme.shadows.small.elevation};
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
  padding-top: ${isWeb ? 0 : theme.spacing.lg}px;
`;

export const MenuButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;

export const LocationContainer = styled.View`
  flex: 1;
  margin-left: ${theme.spacing.md}px;
`;

export const LocationLabel = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.semibold};
`;

export const LocationText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
  font-weight: ${theme.fontWeight.medium};
`;

export const NotificationButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
  position: relative;
`;

export const NotificationBadge = styled.View`
  position: absolute;
  top: ${theme.spacing.sm}px;
  right: ${theme.spacing.sm}px;
  background-color: ${theme.colors.primary};
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.background.input};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  margin-top: ${theme.spacing.sm}px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
  margin-left: ${theme.spacing.md}px;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  padding: ${theme.spacing.xl}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

export const SeeAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const SeeAllText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.semibold};
  margin-right: ${theme.spacing.xs}px;
`;

export const CategoriesContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: ${theme.spacing.sm}px;
`;

export const AuctionsContainer = styled.View`
  padding-bottom: ${moderateScale(80)}px;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${theme.spacing.xxl}px;
  right: ${theme.spacing.xl}px;
  background-color: ${theme.colors.primary};
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px ${theme.spacing.xxl}px;
  border-radius: ${theme.borderRadius.full}px;
  shadow-color: ${theme.shadows.large.shadowColor};
  shadow-offset: ${theme.shadows.large.shadowOffset.width}px ${theme.shadows.large.shadowOffset.height}px;
  shadow-opacity: ${theme.shadows.large.shadowOpacity};
  shadow-radius: ${theme.shadows.large.shadowRadius}px;
  elevation: ${theme.shadows.large.elevation};
`;

export const FloatingButtonText = styled.Text`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
  margin-left: ${theme.spacing.sm}px;
`;

export const GreetingText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const WelcomeText = styled.Text`
  font-size: ${theme.fontSize.xxxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;
