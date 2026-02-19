import { Ionicons } from "@expo/vector-icons";
import { Container, IconContainer, Label } from "./styles";

export default function CategoryChip({
  icon,
  label,
  selected = false,
  onPress,
}) {
  return (
    <Container selected={selected} onPress={onPress} activeOpacity={0.7}>
      {icon && (
        <IconContainer>
          <Ionicons
            name={icon}
            size={20}
            color={selected ? "#fff" : "#ff6b35"}
          />
        </IconContainer>
      )}
      <Label selected={selected}>{label}</Label>
    </Container>
  );
}
