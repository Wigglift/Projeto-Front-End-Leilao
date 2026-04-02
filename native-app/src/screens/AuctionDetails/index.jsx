import { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "../../utils/responsive";
import lotService from "../../services/lotService";
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
  LotesSection,
  LoteItem,
  LoteInfoText,
  LoteSubText,
  DetalhesButton,
  DetalhesButtonText,
  LoteLoadingContainer,
} from "./styles";

export default function AuctionDetails({ route, navigation }) {
  const { auction } = route.params;
  const [lotes, setLotes] = useState([]);
  const [loadingLotes, setLoadingLotes] = useState(true);

  useEffect(() => {
    loadLotes();
  }, []);

  const loadLotes = async () => {
    try {
      setLoadingLotes(true);
      const data = await lotService.getLotesByLeilao(auction.id, {});
      setLotes(data);
    } catch (error) {
      console.error("Erro ao carregar lotes:", error);
    } finally {
      setLoadingLotes(false);
    }
  };

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

  const getLoteTitle = (lote) => {
    const parts = [lote.marca, lote.modelo].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : `Lote #${lote.id}`;
  };

  const getLoteSubtitle = (lote) => {
    const parts = [];
    if (lote.anoFabricacao) parts.push(lote.anoFabricacao);
    if (lote.combustivel) parts.push(lote.combustivel);
    if (lote.km > 0) parts.push(`${lote.km.toLocaleString()} km`);
    return parts.join(' · ') || lote.tipoVeiculo || '';
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

          <LotesSection>
            <SectionTitle>
              Lotes{lotes.length > 0 ? ` (${lotes.length})` : ''}
            </SectionTitle>

            {loadingLotes ? (
              <LoteLoadingContainer>
                <ActivityIndicator size="small" color="#5A9FD4" />
              </LoteLoadingContainer>
            ) : lotes.length === 0 ? (
              <DescriptionText>Nenhum lote disponível para este leilão.</DescriptionText>
            ) : (
              lotes.map((lote) => (
                <LoteItem key={lote.id}>
                  <View style={{ flex: 1 }}>
                    <LoteInfoText numberOfLines={1}>{getLoteTitle(lote)}</LoteInfoText>
                    <LoteSubText numberOfLines={1}>{getLoteSubtitle(lote)}</LoteSubText>
                    <LoteSubText>{lote.valorInicialFormatted}</LoteSubText>
                  </View>
                  <DetalhesButton
                    onPress={() => navigation.navigate('LotDetails', { lote, auction })}
                    activeOpacity={0.7}
                  >
                    <DetalhesButtonText>Detalhes</DetalhesButtonText>
                  </DetalhesButton>
                </LoteItem>
              ))
            )}
          </LotesSection>
        </InfoCard>
      </ScrollView>
    </Container>
  );
}
