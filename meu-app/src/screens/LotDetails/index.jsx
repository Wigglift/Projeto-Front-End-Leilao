import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "../../utils/responsive";
import {
  Container,
  Header,
  BackButton,
  Content,
  InfoCard,
  TitleSection,
  LotTitle,
  LotSubtitle,
  TypeBadge,
  TypeText,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  PriceSection,
  PriceLabel,
  PriceValue,
  LanceSection,
  LanceLabel,
  LanceValue,
  FeaturesSection,
  FeatureItem,
  FeatureIcon,
  FeatureText,
  ButtonContainer,
  BidButton,
  BidButtonText,
} from "./styles";

export default function LotDetails({ navigation, route }) {
  const { lote, auction } = route.params;

  const getTipoBadgeColor = (tipo) => {
    if (tipo === "MEDIA_MONTA") {
      return { bg: "#FFF3E0", text: "#F57C00" };
    }
    return { bg: "#F5F5F5", text: "#757575" };
  };

  const badgeColors = getTipoBadgeColor(lote.tipo);

  const getVehicleTitle = () => {
    const parts = [];

    if (lote.marca) {
      parts.push(lote.marca);
    }

    if (lote.modelo) {
      parts.push(lote.modelo);
    }

    if (parts.length === 0) {
      return `Lote #${lote.id}`;
    }

    return parts.join(" ");
  };

  const getYearInfo = () => {
    if (lote.anoFabricacao && lote.anoModelo) {
      return `${lote.anoFabricacao}/${lote.anoModelo}`;
    }
    if (lote.anoFabricacao) {
      return `Ano ${lote.anoFabricacao}`;
    }
    return "Ano não informado";
  };

  const handleBidPress = () => {
    Alert.alert(
      "Dar Lance",
      `Deseja dar um lance no lote ${lote.id}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            Alert.alert("Sucesso", "Lance registrado com sucesso!");
          },
        },
      ]
    );
  };

  const features = [
    { label: "Ar Condicionado", value: lote.ar },
    { label: "Vidro Elétrico", value: lote.vidroEletrico },
    { label: "Direção Hidráulica", value: lote.direcao },
    { label: "Câmbio Automático", value: lote.automatico },
    { label: "Blindagem", value: lote.blindagem },
    { label: "Estepe", value: lote.estepe },
    { label: "Manual do Proprietário", value: lote.manualProprietario },
    { label: "Chave Reserva", value: lote.chave },
    { label: "IPVA Pago", value: lote.ipvaPago },
    { label: "Kit GNV", value: lote.kitGas },
    { label: "Parabrisa Original", value: lote.parabrisaOriginal },
    { label: "Vidro Traseiro Original", value: lote.vidroTraseiroOriginal },
  ].filter(f => f.value !== null);

  const documentInfo = [
    { label: "Doc. Blindagem", value: lote.docBlindagem },
    { label: "Consta Blindagem", value: lote.constaBlindagem },
    { label: "Documento GNV", value: lote.documentoGnv },
    { label: "Outro Estado", value: lote.outroEstadoDocumento },
    { label: "Placa Diverge", value: lote.placaDivergeDocumento },
    { label: "Consta Sinistro", value: lote.constaSinistroDocumento },
    { label: "Consta CRLVE", value: lote.constaCrlve },
  ].filter(f => f.value !== null);

  const vehicleConditions = [
    { label: "Ligando", value: lote.ligando, icon: "power" },
    { label: "Alagamento", value: lote.alagamento, icon: "water" },
    { label: "Chassi com Oxidação", value: lote.chassiOxidacao, icon: "warning" },
    { label: "Câmbio Obstruído", value: lote.cambioObstruido, icon: "settings" },
    { label: "Câmbio Periciado", value: lote.cambioPericiado, icon: "construct" },
    { label: "Emissão Laudo CSV", value: lote.emissaoLaudoCsv, icon: "document-text" },
  ].filter(f => f.value !== null);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={moderateScale(24)} color="#FFFFFF" />
        </BackButton>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <InfoCard>
          <TitleSection>
            <LotTitle>{getVehicleTitle()}</LotTitle>
            <LotSubtitle>
              {lote.tipoVeiculo || "Não informado"}
            </LotSubtitle>
            <TypeBadge backgroundColor={badgeColors.bg}>
              <TypeText color={badgeColors.text}>
                {lote.tipo === "MEDIA_MONTA" ? "MÉDIA MONTA" : (lote.tipo || "Não informado")}
              </TypeText>
            </TypeBadge>
          </TitleSection>

          <PriceSection>
            <PriceLabel>Valor Inicial</PriceLabel>
            <PriceValue>{lote.valorInicialFormatted}</PriceValue>

            {lote.lance !== null && (
              <LanceSection>
                <LanceLabel>Lance Atual</LanceLabel>
                <LanceValue>{lote.lanceFormatted}</LanceValue>
              </LanceSection>
            )}
          </PriceSection>
        </InfoCard>

        <InfoCard>
          <SectionTitle>Informações do Veículo</SectionTitle>

          <InfoRow>
            <InfoLabel>Lote</InfoLabel>
            <InfoValue>#{lote.id}</InfoValue>
          </InfoRow>

          {lote.marca && (
            <InfoRow>
              <InfoLabel>Marca</InfoLabel>
              <InfoValue>{lote.marca}</InfoValue>
            </InfoRow>
          )}

          {lote.modelo && (
            <InfoRow>
              <InfoLabel>Modelo</InfoLabel>
              <InfoValue>{lote.modelo}</InfoValue>
            </InfoRow>
          )}

          <InfoRow>
            <InfoLabel>Ano</InfoLabel>
            <InfoValue>{getYearInfo()}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Combustível</InfoLabel>
            <InfoValue>{lote.combustivel || "Não informado"}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Quilometragem</InfoLabel>
            <InfoValue>
              {lote.km > 0 ? `${lote.km.toLocaleString()} km` : "Não informado"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Cidade do Documento</InfoLabel>
            <InfoValue>{lote.cidadeDocumento || "Não informado"}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Leilão</InfoLabel>
            <InfoValue numberOfLines={1}>{auction.titulo}</InfoValue>
          </InfoRow>
        </InfoCard>

        {features.length > 0 && (
          <InfoCard>
            <SectionTitle>Características</SectionTitle>
            <FeaturesSection>
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon available={feature.value}>
                    <Ionicons
                      name={feature.value ? "checkmark" : "close"}
                      size={moderateScale(18)}
                      color={feature.value ? "#388E3C" : "#D32F2F"}
                    />
                  </FeatureIcon>
                  <FeatureText>{feature.label}</FeatureText>
                </FeatureItem>
              ))}
            </FeaturesSection>
          </InfoCard>
        )}

        {documentInfo.length > 0 && (
          <InfoCard>
            <SectionTitle>Informações Documentais</SectionTitle>
            <FeaturesSection>
              {documentInfo.map((info, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon available={info.value}>
                    <Ionicons
                      name={info.value ? "checkmark" : "close"}
                      size={moderateScale(18)}
                      color={info.value ? "#388E3C" : "#D32F2F"}
                    />
                  </FeatureIcon>
                  <FeatureText>{info.label}</FeatureText>
                </FeatureItem>
              ))}
            </FeaturesSection>
          </InfoCard>
        )}

        {vehicleConditions.length > 0 && (
          <InfoCard>
            <SectionTitle>Condições do Veículo</SectionTitle>
            <FeaturesSection>
              {vehicleConditions.map((condition, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon available={condition.value}>
                    <Ionicons
                      name={condition.value ? "checkmark" : "close"}
                      size={moderateScale(18)}
                      color={condition.value ? "#388E3C" : "#D32F2F"}
                    />
                  </FeatureIcon>
                  <FeatureText>{condition.label}</FeatureText>
                </FeatureItem>
              ))}
            </FeaturesSection>
          </InfoCard>
        )}
      </Content>

      <ButtonContainer>
        <BidButton onPress={handleBidPress} activeOpacity={0.8}>
          <Ionicons name="hammer" size={moderateScale(24)} color="#FFFFFF" />
          <BidButtonText>Dar Lance</BidButtonText>
        </BidButton>
      </ButtonContainer>
    </Container>
  );
}
