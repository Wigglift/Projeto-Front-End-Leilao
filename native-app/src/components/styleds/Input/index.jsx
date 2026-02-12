import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { 
  Container, 
  Label, 
  InputWrapper, 
  StyledInput, 
  IconButton 
} from "./styles";

export default function Input({ 
  label,
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  placeholderTextColor = "#999",
  showPasswordToggle = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={placeholderTextColor}
        />
        {showPasswordToggle && secureTextEntry && (
          <IconButton onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#999"
            />
          </IconButton>
        )}
      </InputWrapper>
    </Container>
  );
}
