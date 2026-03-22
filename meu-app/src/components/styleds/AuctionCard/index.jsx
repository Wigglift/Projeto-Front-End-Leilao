import {
    Container,
    Image,
    InfoContainer,
    Title,
    Description,
} from "./styles";

export default function AuctionCard({
    title,
    description,
    imageUrl,
    onPress,
}) {
    return (
        <Container onPress={onPress} activeOpacity={0.8}>
            <Image
                source={{uri: imageUrl}}
                resizeMode="cover"
            />
            <InfoContainer>
                <Title numberOfLines={1}>{title}</Title>
                <Description numberOfLines={2}>{description}</Description>
            </InfoContainer>
        </Container>
    );
}
