import { ButtonContainer, ButtonText } from "./styles";

export default function Button({ 
  title, 
  onPress, 
  variant = "primary",
  disabled = false 
}) {
  return (
    <ButtonContainer 
      onPress={onPress} 
      variant={variant}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <ButtonText variant={variant}>{title}</ButtonText>
    </ButtonContainer>
  );
}
