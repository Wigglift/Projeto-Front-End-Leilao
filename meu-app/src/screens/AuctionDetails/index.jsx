import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "../../utils/responsive";
import {
  Container,
  InfoCard,
  InfoRow,
  InfoLabel,
  InfoValue,
  AuctionInfo,
  Header,
  BackButton,
  ImageContainer,
  ProductImage,
  ExpandButton,
  ProductTitle,
  SellerInfo,
  SellerAvatar,
  SellerName,
  DescriptionSection,
  SectionTitle,
  DescriptionText,
} from "./styles";

export default function AuctionDetails({ route, navigation }) {
  const { auction } = route.params;

  const formatDate = (dateString) => {
    if (!dateString) return "Não informada";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={moderateScale(24)} color="#FFFFFF" />
        </BackButton>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageContainer>
          <ProductImage
            source={{ uri: auction.imagemUrl }}
            resizeMode="contain"
          />
          <ExpandButton>
            <Ionicons name="expand-outline" size={moderateScale(22)} color="#FFFFFF" />
          </ExpandButton>
        </ImageContainer>

        <InfoCard>
          <ProductTitle>{auction.titulo}</ProductTitle>
          <SellerInfo>
            <SellerAvatar
              source={{ uri: "https://i.pravatar.cc/150?img=10" }}
            />
            <SellerName>{auction.leiloeiro || "Leiloeiro"}</SellerName>
          </SellerInfo>

          <DescriptionSection>
            <SectionTitle>Descrição</SectionTitle>
            <DescriptionText>{auction.descricao}</DescriptionText>
          </DescriptionSection>

          <AuctionInfo>
            <SectionTitle>Informações do Leilão</SectionTitle>
            
            <InfoRow>
              <InfoLabel>Tipo</InfoLabel>
              <InfoValue>{auction.tipo || "Não informado"}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Data</InfoLabel>
              <InfoValue>{formatDate(auction.dataInicio)}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Horário</InfoLabel>
              <InfoValue>{auction.horario || "Não informado"}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Cidade</InfoLabel>
              <InfoValue>{auction.cidade || "Não informada"}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Estado</InfoLabel>
              <InfoValue>{auction.estado || "Não informado"}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Leiloeiro</InfoLabel>
              <InfoValue>{auction.leiloeiro || "Não informado"}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Status</InfoLabel>
              <InfoValue>{auction.status || "Ativo"}</InfoValue>
            </InfoRow>
          </AuctionInfo>
        </InfoCard>
      </ScrollView>
    </Container>
  );
}
