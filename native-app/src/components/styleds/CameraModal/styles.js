import styled from "styled-components/native";
import { colors, typography, spacing, borderRadius } from "../../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 56px;
  padding-horizontal: ${spacing.lg}px;
  padding-bottom: ${spacing.base}px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: #fff;
`;

export const IconButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

export const GuideContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const GuideCircle = styled.View`
  width: 220px;
  height: 220px;
  border-radius: 110px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.6);
`;

export const Footer = styled.View`
  align-items: center;
  padding-bottom: ${spacing.huge}px;
  padding-top: ${spacing.xl}px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const CaptureButton = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  border-width: 4px;
  border-color: #fff;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const CaptureInner = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #fff;
`;

export const PermissionContainer = styled.View`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxxl}px;
`;

export const PermissionText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.text};
  text-align: center;
  margin-top: ${spacing.base}px;
  margin-bottom: ${spacing.xl}px;
`;

export const PermissionButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding-vertical: ${spacing.md}px;
  padding-horizontal: ${spacing.xxxl}px;
  border-radius: ${borderRadius.md}px;
`;

export const PermissionButtonText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.bold};
  color: #fff;
`;

export const CancelLink = styled.TouchableOpacity`
  margin-top: ${spacing.base}px;
`;

export const CancelLinkText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
`;
