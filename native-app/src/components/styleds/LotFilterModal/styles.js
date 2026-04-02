import styled from "styled-components/native";
import { colors, spacing, borderRadius, typography, shadows } from "../../../theme";
import { moderateScale } from "../../../utils/responsive";

export const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.backgroundCard};
  border-top-left-radius: ${borderRadius.xl}px;
  border-top-right-radius: ${borderRadius.xl}px;
  padding: ${spacing.xl}px;
  max-height: 70%;
  shadow-color: ${shadows.lg.shadowColor};
  shadow-offset: ${shadows.lg.shadowOffset.width}px ${shadows.lg.shadowOffset.height}px;
  shadow-opacity: ${shadows.lg.shadowOpacity};
  shadow-radius: ${shadows.lg.shadowRadius}px;
  elevation: ${shadows.lg.elevation};
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xl}px;
  padding-bottom: ${spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const ModalTitle = styled.Text`
  font-size: ${typography.fontSize.xxxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  min-width: 36px;
  min-height: 36px;
  justify-content: center;
  align-items: center;
`;

export const FilterSection = styled.View`
  margin-bottom: ${spacing.sm}px;
`;

export const FilterLabel = styled.View`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
  flex-direction: row;
  align-items: center;
`;

export const FilterLabelText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text};
  margin-left: ${spacing.xs}px;
`;

export const FilterInput = styled.TextInput`
  background-color: ${colors.backgroundSecondary};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  font-size: ${typography.fontSize.base}px;
  color: ${colors.text};
  margin-bottom: ${spacing.sm}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const PickerContainer = styled.View`
  margin-bottom: ${spacing.md}px;
`;

export const PickerButton = styled.TouchableOpacity`
  background-color: ${colors.backgroundSecondary};
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const PickerText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${props => props.hasValue ? colors.text : colors.textMuted};
  flex: 1;
`;

export const PickerIconContainer = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
  margin-top: ${spacing.lg}px;
  padding-bottom: ${spacing.lg}px;
`;

export const ClearButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${spacing.xs}px;
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  border-width: 1px;
  border-color: ${colors.border};
  background-color: ${colors.backgroundSecondary};
`;

export const ClearButtonText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.textSecondary};
`;

export const ApplyButton = styled.TouchableOpacity`
  flex: 2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${spacing.xs}px;
  padding: ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  background-color: ${colors.primary};
  shadow-color: ${shadows.md.shadowColor};
  shadow-offset: ${shadows.md.shadowOffset.width}px ${shadows.md.shadowOffset.height}px;
  shadow-opacity: ${shadows.md.shadowOpacity};
  shadow-radius: ${shadows.md.shadowRadius}px;
  elevation: ${shadows.md.elevation};
`;

export const ApplyButtonText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  font-weight: ${typography.fontWeight.bold};
  color: #FFFFFF;
`;
