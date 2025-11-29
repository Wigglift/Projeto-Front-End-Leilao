import {Ionicons} from "@expo/vector-icons";
import {
    Container,
    Image,
    InfoContainer,
    Title,
    Description,
    Footer,
    FooterItem,
    FooterText,
    CurrentBid,
    BidLabel,
    BidValue,
} from "./styles";

export default function AuctionCard({
                                        title,
                                        description,
                                        imageUrl,
                                        currentBid,
                                        timeRemaining,
                                        totalBids,
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

                <CurrentBid>
                    <BidLabel>Lance Atual:</BidLabel>
                    <BidValue>R$ {currentBid}</BidValue>
                </CurrentBid>

                <Footer>
                    <FooterItem>
                        <Ionicons name="time-outline" size={16} color="#666"/>
                        <FooterText>{timeRemaining}</FooterText>
                    </FooterItem>

                    <FooterItem>
                        <Ionicons name="people-outline" size={16} color="#666"/>
                        <FooterText>{totalBids} lances</FooterText>
                    </FooterItem>
                </Footer>
            </InfoContainer>
        </Container>
    );
}
