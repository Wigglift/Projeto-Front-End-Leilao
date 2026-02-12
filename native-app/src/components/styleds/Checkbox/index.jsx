import { Container, CheckboxBox, CheckboxInner, Label } from "./styles";

export default function Checkbox({ 
  label, 
  checked, 
  onPress 
}) {
  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <CheckboxBox>
        <CheckboxInner checked={checked} />
      </CheckboxBox>
      {label && <Label>{label}</Label>}
    </Container>
  );
}
