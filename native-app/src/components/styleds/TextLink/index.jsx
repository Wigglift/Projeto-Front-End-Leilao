import { LinkButton, LinkText } from "./styles";

export default function TextLink({
  text,
  onPress,
  bold = false,
  color = "#ff6b35",
}) {
  return (
    <LinkButton onPress={onPress} activeOpacity={0.7}>
      <LinkText bold={bold} color={color}>
        {text}
      </LinkText>
    </LinkButton>
  );
}
