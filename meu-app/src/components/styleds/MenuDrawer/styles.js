import styled from "styled-components/native";
import { colors, spacing, typography, shadows } from "../../../theme";

export const DrawerOverlay = styled.View`
  flex: 1;
  background-color: ${colors.backgroundOverlay};
  justify-content: flex-start;
`;

export const DrawerContainer = styled.View`
  width: 80%;
  max-width: 320px;
  height: 100%;
  background-color: ${colors.backgroundCard};
  shadow-color: ${shadows.lg.shadowColor};
  shadow-offset: ${shadows.lg.shadowOffset.width}px ${shadows.lg.shadowOffset.height}px;
  shadow-opacity: ${shadows.lg.shadowOpacity};
  shadow-radius: ${shadows.lg.shadowRadius}px;
  elevation: ${shadows.lg.elevation};
`;

export const DrawerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.xl}px ${spacing.base}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  background-color: ${colors.primaryDark};
`;

export const DrawerTitle = styled.Text`
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${spacing.xs}px;
`;

export const MenuList = styled.ScrollView`
  flex: 1;
  padding: ${spacing.md}px 0;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.lg}px ${spacing.base}px;
  active-opacity: 0.7;
`;

export const MenuItemIcon = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md}px;
`;

export const MenuItemText = styled.Text`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text};
  flex: 1;
`;

export const MenuDivider = styled.View`
  height: 1px;
  background-color: ${colors.divider};
  margin: ${spacing.md}px ${spacing.base}px;
`;
