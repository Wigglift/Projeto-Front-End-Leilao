import styled from "styled-components/native";

const getBackgroundColor = (variant, disabled) => {
  if (disabled) return "#cccccc";
  
  switch (variant) {
    case "primary":
      return "#ff6b35";
    case "secondary":
      return "#ffffff";
    case "outline":
      return "transparent";
    default:
      return "#ff6b35";
  }
};

const getTextColor = (variant) => {
  switch (variant) {
    case "primary":
      return "#ffffff";
    case "secondary":
      return "#ff6b35";
    case "outline":
      return "#ff6b35";
    default:
      return "#ffffff";
  }
};

const getBorderColor = (variant) => {
  if (variant === "outline") return "#ff6b35";
  return "transparent";
};

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => getBackgroundColor(props.variant, props.disabled)};
  border-radius: 12px;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-width: ${(props) => (props.variant === "outline" ? "2px" : "0px")};
  border-color: ${(props) => getBorderColor(props.variant)};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => getTextColor(props.variant)};
  letter-spacing: 1px;
`;
