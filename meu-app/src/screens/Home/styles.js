import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
`;

export const Header = styled.View`
  background-color: #ffffff;
  padding: 24px 20px 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const MenuButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const LocationContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const LocationLabel = styled.Text`
  font-size: 12px;
  color: #ff6b35;
  font-weight: 600;
`;

export const LocationText = styled.Text`
  font-size: 14px;
  color: #333333;
  font-weight: 500;
`;

export const NotificationButton = styled.TouchableOpacity`
  padding: 8px;
  position: relative;
`;

export const NotificationBadge = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #ff6b35;
  width: 8px;
  height: 8px;
  border-radius: 4px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 8px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #333333;
  margin-left: 12px;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  padding: 20px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`;

export const SeeAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const SeeAllText = styled.Text`
  font-size: 14px;
  color: #ff6b35;
  font-weight: 600;
  margin-right: 4px;
`;

export const CategoriesContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: 8px;
`;

export const AuctionsContainer = styled.View`
  padding-bottom: 80px;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 20px;
  background-color: #ff6b35;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  border-radius: 30px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 6;
`;

export const FloatingButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

export const GreetingText = styled.Text`
  font-size: 16px;
  color: #333333;
  margin-bottom: 4px;
`;

export const WelcomeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
`;
