import { useState, useEffect } from "react";
import { ActivityIndicator, RefreshControl, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuctionCard from "../../components/styleds/AuctionCard";
import auctionService from "../../services/auctionService";
import { moderateScale } from "../../utils/responsive";
import {
  Container,
  Header,
  HeaderTop,
  BackButton,
  HeaderTitle,
  HeaderSubtitle,
  Content,
  ListContainer,
  EmptyContainer,
  EmptyText,
  LoadingContainer,
} from "./styles";

export default function AuctionListForLots({ navigation }) {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAuctions();
  }, []);

  const loadAuctions = async () => {
    try {
      setLoading(true);
      const data = await auctionService.getActiveAuctions();
      setAuctions(data);
    } catch (error) {
      console.error("Erro ao carregar leilões:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar os leilões. Verifique sua conexão e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAuctions();
    setRefreshing(false);
  };

  const handleAuctionPress = (auction) => {
    navigation.navigate("LotList", { auction });
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={moderateScale(24)} color="#FFFFFF" />
          </BackButton>
          <HeaderTitle>Lotes</HeaderTitle>
          <BackButton style={{ opacity: 0 }} disabled>
            <Ionicons name="chevron-back" size={moderateScale(24)} color="transparent" />
          </BackButton>
        </HeaderTop>
        <HeaderSubtitle>Selecione um leilão para ver os lotes</HeaderSubtitle>
      </Header>

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#5A9FD4" />
          </LoadingContainer>
        ) : auctions.length > 0 ? (
          <ListContainer>
            {auctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                title={auction.titulo}
                description={auction.descricao}
                imageUrl={auction.imagemUrl}
                currentBid={auction.currentBidFormatted}
                timeRemaining={auction.timeRemaining}
                totalBids={auction.totalLances}
                onPress={() => handleAuctionPress(auction)}
              />
            ))}
          </ListContainer>
        ) : (
          <EmptyContainer>
            <Ionicons name="cube-outline" size={moderateScale(80)} color="#999" />
            <EmptyText>
              Nenhum leilão disponível{"\n"}no momento
            </EmptyText>
          </EmptyContainer>
        )}
      </Content>
    </Container>
  );
}
