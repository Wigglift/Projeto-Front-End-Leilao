import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "../../../utils/responsive";
import {
  Container,
  InfoContainer,
  Header,
  TitleContainer,
  Title,
  Subtitle,
  TypeBadge,
  TypeText,
  DetailsRow,
  DetailItem,
  DetailText,
  PriceContainer,
  PriceLabel,
  PriceValue,
  LanceContainer,
  LanceLabel,
  LanceValue,
} from "./styles";

export default function LotCard({
  lote,
  onPress,
}) {
  const getTipoBadgeColor = (tipo) => {
    if (tipo === "MEDIA_MONTA") {
      return { bg: "#FFF3E0", text: "#F57C00" };
    }
    return { bg: "#F5F5F5", text: "#757575" };
  };

  const badgeColors = getTipoBadgeColor(lote.tipo);

  const getVehicleInfo = () => {
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
      return `${lote.anoFabricacao}`;
    }
    return null;
  };

  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <InfoContainer>
        <Header>
          <TitleContainer>
            <Title numberOfLines={2}>{getVehicleInfo()}</Title>
            <Subtitle numberOfLines={1}>
              {lote.tipoVeiculo || "Não informado"}
            </Subtitle>
          </TitleContainer>
          <TypeBadge backgroundColor={badgeColors.bg}>
            <TypeText color={badgeColors.text}>
              {lote.tipo === "MEDIA_MONTA" ? "MÉDIA" : (lote.tipo || "Não informado")}
            </TypeText>
          </TypeBadge>
        </Header>

        <DetailsRow>
          {getYearInfo() && (
            <DetailItem>
              <Ionicons name="calendar-outline" size={moderateScale(16)} color="#999" />
              <DetailText>{getYearInfo()}</DetailText>
            </DetailItem>
          )}

          {lote.combustivel && (
            <DetailItem>
              <Ionicons name="water-outline" size={moderateScale(16)} color="#999" />
              <DetailText>{lote.combustivel}</DetailText>
            </DetailItem>
          )}

          {lote.km > 0 && (
            <DetailItem>
              <Ionicons name="speedometer-outline" size={moderateScale(16)} color="#999" />
              <DetailText>{lote.km.toLocaleString()} km</DetailText>
            </DetailItem>
          )}

          {lote.cidadeDocumento && (
            <DetailItem>
              <Ionicons name="location-outline" size={moderateScale(16)} color="#999" />
              <DetailText>{lote.cidadeDocumento}</DetailText>
            </DetailItem>
          )}
        </DetailsRow>

        <PriceContainer>
          <PriceLabel>Valor Inicial</PriceLabel>
          <PriceValue>{lote.valorInicialFormatted}</PriceValue>
        </PriceContainer>

        {lote.lance !== null && (
          <LanceContainer>
            <LanceLabel>Lance Atual</LanceLabel>
            <LanceValue>{lote.lanceFormatted}</LanceValue>
          </LanceContainer>
        )}
      </InfoContainer>
    </Container>
  );
}
