import styled from "styled-components/native";
import { colors, spacing, typography, borderRadius } from "../../../theme";

const getBackgroundColor = (variant, disabled) => {
  if (disabled) return colors.buttonDisabled;
  
  switch (variant) {
    case "primary":
      return colors.buttonPrimary;
    case "secondary":
      return colors.buttonSecondary;
    case "outline":
      return colors.transparent;
    default:
      return colors.buttonPrimary;
  }
};

const getTextColor = (variant) => {
  switch (variant) {
    case "primary":
      return colors.buttonPrimaryText;
    case "secondary":
      return colors.buttonSecondaryText;
    case "outline":
      return colors.buttonSecondaryText;
    default:
      return colors.buttonPrimaryText;
  }
};

const getBorderColor = (variant) => {
  if (variant === "outline" || variant === "secondary") return colors.buttonSecondaryBorder;
  return colors.transparent;
};

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => getBackgroundColor(props.variant, props.disabled)};
  border-radius: ${borderRadius.md}px;
  min-height: 56px;
  padding: ${spacing.base}px;
  justify-content: center;
  align-items: center;
  border-width: ${(props) => (props.variant === "outline" || props.variant === "secondary" ? "1px" : "0px")};
  border-color: ${(props) => getBorderColor(props.variant)};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semiBold};
  color: ${(props) => getTextColor(props.variant)};
`;
