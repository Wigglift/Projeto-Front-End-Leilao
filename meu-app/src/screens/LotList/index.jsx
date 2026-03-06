import { useState, useEffect } from "react";
import { ActivityIndicator, RefreshControl, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LotCard from "../../components/styleds/LotCard";
import lotService from "../../services/lotService";
import { moderateScale } from "../../utils/responsive";
import {
  Container,
  Header,
  HeaderTop,
  BackButton,
  HeaderTitle,
  AuctionInfo,
  AuctionTitle,
  AuctionSubtitle,
  Content,
  ListContainer,
  EmptyContainer,
  EmptyText,
  LoadingContainer,
} from "./styles";

export default function LotList({ navigation, route }) {
  const { auction } = route.params;
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLotes();
  }, []);

  const loadLotes = async () => {
    try {
      setLoading(true);
      const data = await lotService.getLotesByLeilao(auction.id, {});
      setLotes(data);
    } catch (error) {
      console.error("Erro ao carregar lotes:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar os lotes. Verifique sua conexão e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLotes();
    setRefreshing(false);
  };

  const handleLotPress = (lote) => {
    navigation.navigate("LotDetails", { lote, auction });
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={moderateScale(24)} color="#FFFFFF" />
          </BackButton>
          <HeaderTitle>Lotes</HeaderTitle>
        </HeaderTop>

        <AuctionInfo>
          <AuctionTitle numberOfLines={2}>{auction.titulo}</AuctionTitle>
          <AuctionSubtitle>
            {lotes.length} {lotes.length === 1 ? "lote disponível" : "lotes disponíveis"}
          </AuctionSubtitle>
        </AuctionInfo>
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
        ) : lotes.length > 0 ? (
          <ListContainer>
            {lotes.map((lote) => (
              <LotCard
                key={lote.id}
                lote={lote}
                onPress={() => handleLotPress(lote)}
              />
            ))}
          </ListContainer>
        ) : (
          <EmptyContainer>
            <Ionicons name="cube-outline" size={moderateScale(80)} color="#999" />
            <EmptyText>
              Nenhum lote disponível{"\n"}para este leilão
            </EmptyText>
          </EmptyContainer>
        )}
      </Content>
    </Container>
  );
}
