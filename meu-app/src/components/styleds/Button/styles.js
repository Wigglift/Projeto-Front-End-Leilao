import styled from "styled-components/native";
import theme from "../../../styles/theme";

const getBackgroundColor = (variant, disabled) => {
  if (disabled) return theme.colors.background.disabled;
  
  switch (variant) {
    case "primary":
      return theme.colors.primary;
    case "secondary":
      return theme.colors.secondary;
    case "outline":
      return theme.colors.transparent;
    default:
      return theme.colors.primary;
  }
};

const getTextColor = (variant) => {
  switch (variant) {
    case "primary":
      return theme.colors.text.white;
    case "secondary":
      return theme.colors.primary;
    case "outline":
      return theme.colors.primary;
    default:
      return theme.colors.text.white;
  }
};

const getBorderColor = (variant) => {
  if (variant === "outline") return theme.colors.primary;
  return theme.colors.transparent;
};

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => getBackgroundColor(props.variant, props.disabled)};
  border-radius: ${theme.borderRadius.md}px;
  height: ${theme.componentHeight.button}px;
  justify-content: center;
  align-items: center;
  border-width: ${(props) => (props.variant === "outline" ? "2px" : "0px")};
  border-color: ${(props) => getBorderColor(props.variant)};
  opacity: ${(props) => (props.disabled ? theme.opacity.disabled : 1)};
`;

export const ButtonText = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${(props) => getTextColor(props.variant)};
  letter-spacing: 1px;
`;
