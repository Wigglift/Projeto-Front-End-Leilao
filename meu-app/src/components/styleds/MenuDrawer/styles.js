import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const DrawerOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-start;
`;

export const DrawerContainer = styled.View`
  width: 80%;
  max-width: 320px;
  height: 100%;
  background-color: ${theme.colors.background.secondary};
  shadow-color: ${theme.shadows.large.shadowColor};
  shadow-offset: ${theme.shadows.large.shadowOffset.width}px ${theme.shadows.large.shadowOffset.height}px;
  shadow-opacity: ${theme.shadows.large.shadowOpacity};
  shadow-radius: ${theme.shadows.large.shadowRadius}px;
`;

export const DrawerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.xxl}px ${theme.spacing.xl}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
  background-color: ${theme.colors.primaryLight};
`;

export const DrawerTitle = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px;
`;

export const MenuList = styled.ScrollView`
  flex: 1;
  padding: ${theme.spacing.md}px 0;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px ${theme.spacing.xl}px;
  active-opacity: 0.7;
`;

export const MenuItemIcon = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.md}px;
`;

export const MenuItemText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

export const MenuDivider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border.light};
  margin: ${theme.spacing.md}px ${theme.spacing.xl}px;
`;
