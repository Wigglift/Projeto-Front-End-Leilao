import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "../../../utils/responsive";
import {
    Container,
    Image,
    InfoContainer,
    Title,
    Description,
    MetaRow,
    MetaItem,
    MetaText,
} from "./styles";

const formatShortDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
};

export default function AuctionCard({
    title,
    description,
    imageUrl,
    city,
    state,
    date,
    totalLots,
    onPress,
}) {
    const shortDate = formatShortDate(date);

    return (
        <Container onPress={onPress} activeOpacity={0.8}>
            <Image
                source={{uri: imageUrl}}
                resizeMode="cover"
            />
            <InfoContainer>
                <Title numberOfLines={1}>{title}</Title>
                {description ? (
                    <Description numberOfLines={1}>{description}</Description>
                ) : null}
                <MetaRow>
                    {(city || state) && (
                        <MetaItem>
                            <Ionicons name="location-outline" size={moderateScale(12)} color="#6B8299" />
                            <MetaText>{[city, state].filter(Boolean).join(', ')}</MetaText>
                        </MetaItem>
                    )}
                    {shortDate && (
                        <MetaItem>
                            <Ionicons name="calendar-outline" size={moderateScale(12)} color="#6B8299" />
                            <MetaText>{shortDate}</MetaText>
                        </MetaItem>
                    )}
                    {totalLots > 0 && (
                        <MetaItem>
                            <Ionicons name="cube-outline" size={moderateScale(12)} color="#6B8299" />
                            <MetaText>{totalLots} lotes</MetaText>
                        </MetaItem>
                    )}
                </MetaRow>
            </InfoContainer>
        </Container>
    );
}
