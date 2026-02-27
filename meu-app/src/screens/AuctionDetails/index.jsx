import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollView, Alert, View, Modal, TextInput, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BidConfirmationModal from "../../components/styleds/BidConfirmationModal";
import {
  Container,
  Header,
  BackButton,
  ImageContainer,
  ProductImage,
  ExpandButton,
  InfoCard,
  ProductTitle,
  SellerInfo,
  SellerAvatar,
  SellerName,
  DescriptionSection,
  SectionTitle,
  DescriptionText,
  BidSection,
  BidInfoRow,
  BidInfoCard,
  BidLabel,
  BidValue,
  LiveBadge,
  LiveDot,
  LiveText,
  BidsCount,
  BidsList,
  BidItem,
  BidderInfo,
  BidderAvatar,
  BidderName,
  BidTime,
  BidAmount,
  QuickBidsContainer,
  QuickBidButton,
  QuickBidText,
  CustomBidButton,
  CustomBidText,
  PlaceBidButton,
  PlaceBidText,
} from "./styles";

export default function AuctionDetails({ route, navigation }) {
  const { auction } = route.params;
  const timer = 60;
  const [selectedBid, setSelectedBid] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showCustomBidModal, setShowCustomBidModal] = useState(false);
  const [customBidValue, setCustomBidValue] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [showAuctionEndModal, setShowAuctionEndModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [currentHighestBid, setCurrentHighestBid] = useState(null);
  const [userHasBid, setUserHasBid] = useState(false);
  const timerRef = useRef(null);

  // Lances simulados (mockados)
  const [liveBids] = useState([
    {
      id: 1,
      bidder: "Ronald Richards",
      avatar: "https://i.pravatar.cc/150?img=1",
      amount: 24500,
      time: "20s",
    },
    {
      id: 2,
      bidder: "Cameron Williamson",
      avatar: "https://i.pravatar.cc/150?img=2",
      amount: 20000,
      time: "1m",
    },
    {
      id: 3,
      bidder: "Guy Hawkins",
      avatar: "https://i.pravatar.cc/150?img=3",
      amount: 15000,
      time: "5m",
    },
    {
      id: 4,
      bidder: "Darrell Steward",
      avatar: "https://i.pravatar.cc/150?img=4",
      amount: 12500,
      time: "7m",
    },
    {
      id: 5,
      bidder: "Wade Warren",
      avatar: "https://i.pravatar.cc/150?img=5",
      amount: 10000,
      time: "10m",
    },
  ]);

  const quickBidValues = [26000, 28000, 32000, 35000];
  const initialBid = 5000;
  const currentBid = currentHighestBid || liveBids[0]?.amount || initialBid;

  const handleAuctionEnd = useCallback(() => {
    let auctionWinner;
    const finalBid = currentHighestBid || liveBids[0]?.amount || initialBid;

    if (currentHighestBid && userHasBid) {
      auctionWinner = {
        name: "Você",
        amount: finalBid,
        isCurrentUser: true
      };
    } else {
      auctionWinner = {
        name: liveBids[0].bidder,
        amount: liveBids[0].amount,
        isCurrentUser: false
      };
    }
    
    setWinner(auctionWinner);
    setShowAuctionEndModal(true);
  }, [currentHighestBid, userHasBid, liveBids, initialBid]);

  useEffect(() => {
    setTimeRemaining(timer);
    
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAuctionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [handleAuctionEnd]);

  const handleCloseAuctionEndModal = () => {
    setShowAuctionEndModal(false);
    setWinner(null);
    setCurrentHighestBid(null);
    setUserHasBid(false);
    setSelectedBid(null);
    setTimeRemaining(timer);
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAuctionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuickBid = (value) => {
    setSelectedBid(value);
  };

  const handleOpenCustomBid = () => {
    setCustomBidValue("");
    setShowCustomBidModal(true);
  };

  const handleConfirmCustomBid = () => {
    const value = parseFloat(customBidValue);
    if (isNaN(value) || value <= currentBid) {
      Alert.alert(
        "Valor Inválido",
        `O lance deve ser maior que o lance atual de R$ ${(currentBid / 1000).toFixed(1)}k`
      );
      return;
    }
    setSelectedBid(value);
    setShowCustomBidModal(false);
  };

  const handlePlaceBid = () => {
    const bidValue = selectedBid || quickBidValues[0];
    setSelectedBid(bidValue);
    setShowBidModal(true);
  };

  const handleConfirmBid = () => {
    setShowBidModal(false);

    if (selectedBid > currentBid) {
      setCurrentHighestBid(selectedBid);
      setUserHasBid(true);
    }
    
    Alert.alert(
      "Lance Realizado!",
      `Seu lance de R$ ${(selectedBid / 1000).toFixed(1)}k foi registrado com sucesso!\n\n(Simulação)`,
      [{ text: "OK" }]
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </BackButton>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageContainer>
          <ProductImage
            source={{ uri: auction.imagemUrl }}
            resizeMode="contain"
          />
          <ExpandButton>
            <Ionicons name="expand-outline" size={24} color="#666" />
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

          <BidSection>
            <BidInfoRow>
              <BidInfoCard>
                <BidLabel>Lance Inicial</BidLabel>
                <BidValue>
                  R${(initialBid / 1000).toFixed(1).replace(".", ",")}k
                </BidValue>
                <LiveBadge>
                  <Ionicons name="people" size={16} color="#666" />
                  <LiveText> 24 ao vivo</LiveText>
                </LiveBadge>
              </BidInfoCard>

              <BidInfoCard>
                <BidLabel>Maior Lance</BidLabel>
                <BidValue primary>
                  R${(currentBid / 1000).toFixed(1).replace(".", ",")}k
                </BidValue>
                <LiveBadge>
                  <Ionicons name="time-outline" size={16} color="#ff6b35" />
                  <LiveText primary> {formatTime(timeRemaining)} restantes</LiveText>
                </LiveBadge>
              </BidInfoCard>
            </BidInfoRow>
          </BidSection>

          <BidSection>
            <LiveBadge>
              <LiveDot />
              <LiveText bold>Leilão Live</LiveText>
              <BidsCount>14 lances realizados</BidsCount>
            </LiveBadge>

            <BidsList>
              {liveBids.map((bid) => (
                <BidItem key={bid.id}>
                  <BidderInfo>
                    <BidderAvatar source={{ uri: bid.avatar }} />
                    <View>
                      <BidderName>{bid.bidder}</BidderName>
                      <BidTime>{bid.time}</BidTime>
                    </View>
                  </BidderInfo>
                  <BidAmount>
                    R${(bid.amount / 1000).toFixed(1).replace(".", ",")}k
                  </BidAmount>
                </BidItem>
              ))}
            </BidsList>
          </BidSection>

          <QuickBidsContainer>
            {quickBidValues.map((value) => {
              const isDisabled = value <= currentBid;
              return (
                <QuickBidButton
                  key={value}
                  selected={selectedBid === value}
                  disabled={isDisabled}
                  onPress={() => !isDisabled && handleQuickBid(value)}
                  style={{ opacity: isDisabled ? 0.4 : 1 }}
                >
                  <QuickBidText selected={selectedBid === value}>
                    R${(value / 1000).toFixed(0)}k
                  </QuickBidText>
                </QuickBidButton>
              );
            })}
            <CustomBidButton
              selected={selectedBid && !quickBidValues.includes(selectedBid)}
              onPress={handleOpenCustomBid}
            >
              <CustomBidText>lance customizado</CustomBidText>
            </CustomBidButton>
          </QuickBidsContainer>

          <PlaceBidButton onPress={handlePlaceBid}>
            <PlaceBidText>
              Realizar lance de R$
              {((selectedBid || quickBidValues[0]) / 1000).toFixed(0)}k
            </PlaceBidText>
          </PlaceBidButton>
        </InfoCard>
      </ScrollView>

      <BidConfirmationModal
        visible={showBidModal}
        bidValue={selectedBid}
        onConfirm={handleConfirmBid}
        onCancel={() => setShowBidModal(false)}
      />

      {/* Modal de Lance Customizado */}
      <Modal visible={showCustomBidModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowCustomBidModal(false)}>
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "center", alignItems: "center" }}>
            <TouchableWithoutFeedback>
              <View style={{ backgroundColor: "#13202E", borderRadius: 16, padding: 24, width: "85%", maxWidth: 400 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <SectionTitle>Lance Customizado</SectionTitle>
                  <BackButton onPress={() => setShowCustomBidModal(false)} style={{ width: 32, height: 32 }}>
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                  </BackButton>
                </View>

                <View style={{ marginBottom: 20 }}>
                  <BidLabel style={{ marginBottom: 8 }}>Valor do Lance (em reais)</BidLabel>
                  <TextInput
                    style={{
                      backgroundColor: "#0D1F2D",
                      borderRadius: 8,
                      padding: 16,
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#2A3F54"
                    }}
                    placeholder={`Mínimo: R$ ${((currentBid + 500) / 1000).toFixed(1)}k`}
                    placeholderTextColor="#6B8299"
                    keyboardType="numeric"
                    value={customBidValue}
                    onChangeText={setCustomBidValue}
                  />
                  <DescriptionText style={{ fontSize: 12, marginTop: 8 }}>
                    Lance atual: R$ {(currentBid / 1000).toFixed(1)}k
                  </DescriptionText>
                </View>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <CustomBidButton 
                    style={{ flex: 1, backgroundColor: "#0D1F2D", borderWidth: 1, borderColor: "#2A3F54" }}
                    onPress={() => setShowCustomBidModal(false)}
                  >
                    <CustomBidText style={{ color: "#B0C4DE" }}>Cancelar</CustomBidText>
                  </CustomBidButton>
                  <PlaceBidButton style={{ flex: 2 }} onPress={handleConfirmCustomBid}>
                    <PlaceBidText>Confirmar</PlaceBidText>
                  </PlaceBidButton>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de Leilão Finalizado */}
      <Modal visible={showAuctionEndModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "#13202E", borderRadius: 20, padding: 32, width: "85%", maxWidth: 400, alignItems: "center" }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: winner?.isCurrentUser ? "#4CAF50" : "#F44336",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20
            }}>
              <Ionicons 
                name={winner?.isCurrentUser ? "trophy" : "ribbon"} 
                size={40} 
                color="#fff" 
              />
            </View>

            <SectionTitle style={{ fontSize: 24, marginBottom: 8, textAlign: "center" }}>
              {winner?.isCurrentUser ? "Parabéns!" : "Leilão Finalizado"}
            </SectionTitle>
            
            <DescriptionText style={{ textAlign: "center", marginBottom: 24, fontSize: 16 }}>
              {winner?.isCurrentUser 
                ? "Você arrematou o leilão!"
                : `${winner?.name} arrematou o leilão!`
              }
            </DescriptionText>

            <View style={{ 
              backgroundColor: "#0D1F2D", 
              padding: 20, 
              borderRadius: 12, 
              width: "100%",
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "#2A3F54"
            }}>
              <BidLabel style={{ textAlign: "center", marginBottom: 8 }}>Lance Vencedor</BidLabel>
              <BidValue primary style={{ textAlign: "center", fontSize: 32 }}>
                R$ {winner?.amount ? (winner.amount / 1000).toFixed(1).replace(".", ",") : "0"}k
              </BidValue>
              <DescriptionText style={{ textAlign: "center", marginTop: 8, fontSize: 14 }}>
                Comprador: {winner?.name}
              </DescriptionText>
            </View>

            <PlaceBidButton onPress={handleCloseAuctionEndModal} style={{ width: "100%" }}>
              <PlaceBidText>Fechar</PlaceBidText>
            </PlaceBidButton>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
