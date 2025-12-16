import {Container, Icon, Label} from "./styles";

export default function CategoryChip({
                                         icon,
                                         label,
                                         selected = false,
                                         onPress
                                     }) {
    return (
        <Container selected={selected} onPress={onPress} activeOpacity={0.7}>
            <Icon>{icon}</Icon>
            <Label selected={selected}>{label}</Label>
        </Container>
    );
}
