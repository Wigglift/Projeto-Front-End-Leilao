import { useState, useEffect } from "react";
import { Modal, TouchableWithoutFeedback, ScrollView, Alert, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import lotService from "../../../services/lotService";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FilterSection,
  FilterLabel,
  FilterLabelText,
  FilterInput,
  PickerContainer,
  PickerButton,
  PickerText,
  PickerIconContainer,
  ButtonsRow,
  ClearButton,
  ClearButtonText,
  ApplyButton,
  ApplyButtonText,
} from "./styles";

export default function LotFilterModal({ visible, onClose, onApplyFilters, leilaoId }) {
  const [tipo, setTipo] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [combustivel, setCombustivel] = useState("");
  const [valorMin, setValorMin] = useState("");
  const [valorMax, setValorMax] = useState("");
  const [kmMax, setKmMax] = useState("");

  const [tipos, setTipos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [combustiveis, setCombustiveis] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showAnoModal, setShowAnoModal] = useState(false);
  const [showCombustivelModal, setShowCombustivelModal] = useState(false);

  useEffect(() => {
    if (visible && leilaoId) {
      loadFilterOptions();
    }
  }, [visible, leilaoId]);

  const loadFilterOptions = async () => {
    try {
      setLoading(true);

      const [tiposData, anosData, combustiveisData] = await Promise.all([
        lotService.getTipos(leilaoId),
        lotService.getAnosFabricacao(leilaoId),
        lotService.getCombustiveis(leilaoId)
      ]);

      setTipos(tiposData);
      setAnos(anosData);
      setCombustiveis(combustiveisData);
    } catch (error) {
      console.error("Erro ao carregar opções de filtro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setTipo("");
    setAnoFabricacao("");
    setCombustivel("");
    setValorMin("");
    setValorMax("");
    setKmMax("");
  };

  const handleApplyFilters = () => {
    const filters = {};

    if (tipo) filters.tipo = tipo;
    if (anoFabricacao) filters.ano_fabricacao = parseInt(anoFabricacao);
    if (combustivel) filters.combustivel = combustivel;
    if (kmMax) filters.km = parseInt(kmMax);

    if (valorMin || valorMax) {
      const min = parseFloat(valorMin) || 0;
      const max = parseFloat(valorMax) || Number.MAX_VALUE;

      if (min > max) {
        Alert.alert("Erro", "O valor mínimo não pode ser maior que o valor máximo");
        return;
      }

      filters.valor_inicial = { min, max };
    }

    const hasFilters = Object.keys(filters).length > 0;

    if (!hasFilters) {
      Alert.alert("Atenção", "Selecione pelo menos um filtro para aplicar");
      return;
    }

    onApplyFilters(filters);
    onClose();
  };

  const renderSelectionModal = (title, items, selectedValue, onSelect, visible, onClose) => (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalOverlay>
          <TouchableWithoutFeedback>
            <ModalContainer style={{ maxHeight: "70%" }}>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <CloseButton onPress={onClose}>
                  <Ionicons name="close" size={28} color="#333" />
                </CloseButton>
              </ModalHeader>

              {items.length === 0 ? (
                <PickerButton disabled style={{ opacity: 0.6, paddingVertical: 20 }}>
                  <PickerText>Nenhuma opção disponível</PickerText>
                </PickerButton>
              ) : (
                <FlatList
                  data={items}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item }) => (
                    <PickerButton
                      onPress={() => {
                        onSelect(item);
                        onClose();
                      }}
                      style={{
                        backgroundColor: selectedValue === item?.toString() ? "#fff5f2" : "transparent",
                        borderBottomWidth: 1,
                        borderBottomColor: "#f0f0f0",
                        marginVertical: 8,
                      }}
                    >
                      <PickerText hasValue={selectedValue === item?.toString()}>
                        {item}
                      </PickerText>
                      {selectedValue === item?.toString() && (
                        <Ionicons name="checkmark" size={24} color="#ff6b35" />
                      )}
                    </PickerButton>
                  )}
                  ListHeaderComponent={
                    selectedValue ? (
                      <ClearButton onPress={() => {
                        onSelect("");
                        onClose();
                      }}>
                        <Ionicons name="close-circle" size={20} color="#666" />
                        <ClearButtonText>Limpar Seleção</ClearButtonText>
                      </ClearButton>
                    ) : null
                  }
                />
              )}
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalOverlay />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 100}
      >
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Filtros de Lotes</ModalTitle>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={28} color="#333" />
            </CloseButton>
          </ModalHeader>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 150 }}
            keyboardShouldPersistTaps="handled"
          >
          <FilterSection>
            <FilterLabel>
              <Ionicons name="car-outline" size={20} color="#ff6b35" />
              <FilterLabelText>Tipo de Lote</FilterLabelText>
            </FilterLabel>

            <PickerContainer>
              <PickerButton
                onPress={() => setShowTipoModal(true)}
                disabled={loading}
                style={{ opacity: loading ? 0.5 : 1 }}
              >
                <PickerText hasValue={!!tipo}>
                  {loading ? "Carregando..." : (tipo || "Selecione o tipo")}
                </PickerText>
                <PickerIconContainer>
                  {loading ? (
                    <ActivityIndicator size="small" color="#ff6b35" />
                  ) : (
                    <Ionicons name="chevron-down" size={20} color="#666" />
                  )}
                </PickerIconContainer>
              </PickerButton>
            </PickerContainer>
          </FilterSection>

          <FilterSection>
            <FilterLabel>
              <Ionicons name="calendar-outline" size={20} color="#ff6b35" />
              <FilterLabelText>Ano de Fabricação</FilterLabelText>
            </FilterLabel>

            <PickerContainer>
              <PickerButton
                onPress={() => setShowAnoModal(true)}
                disabled={loading}
                style={{ opacity: loading ? 0.5 : 1 }}
              >
                <PickerText hasValue={!!anoFabricacao}>
                  {loading ? "Carregando..." : (anoFabricacao || "Selecione o ano")}
                </PickerText>
                <PickerIconContainer>
                  {loading ? (
                    <ActivityIndicator size="small" color="#ff6b35" />
                  ) : (
                    <Ionicons name="chevron-down" size={20} color="#666" />
                  )}
                </PickerIconContainer>
              </PickerButton>
            </PickerContainer>
          </FilterSection>

          <FilterSection>
            <FilterLabel>
              <Ionicons name="water-outline" size={20} color="#ff6b35" />
              <FilterLabelText>Combustível</FilterLabelText>
            </FilterLabel>

            <PickerContainer>
              <PickerButton
                onPress={() => setShowCombustivelModal(true)}
                disabled={loading}
                style={{ opacity: loading ? 0.5 : 1 }}
              >
                <PickerText hasValue={!!combustivel}>
                  {loading ? "Carregando..." : (combustivel || "Selecione o combustível")}
                </PickerText>
                <PickerIconContainer>
                  {loading ? (
                    <ActivityIndicator size="small" color="#ff6b35" />
                  ) : (
                    <Ionicons name="chevron-down" size={20} color="#666" />
                  )}
                </PickerIconContainer>
              </PickerButton>
            </PickerContainer>
          </FilterSection>

          <FilterSection>
            <FilterLabel>
              <Ionicons name="cash-outline" size={20} color="#ff6b35" />
              <FilterLabelText>Valor Inicial</FilterLabelText>
            </FilterLabel>

            <FilterInput
              placeholder="Valor mínimo (ex: 10000)"
              value={valorMin}
              onChangeText={setValorMin}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <FilterInput
              placeholder="Valor máximo (ex: 50000)"
              value={valorMax}
              onChangeText={setValorMax}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </FilterSection>

          <FilterSection>
            <FilterLabel>
              <Ionicons name="speedometer-outline" size={20} color="#ff6b35" />
              <FilterLabelText>Quilometragem Máxima</FilterLabelText>
            </FilterLabel>

            <FilterInput
              placeholder="KM máximo (ex: 100000)"
              value={kmMax}
              onChangeText={setKmMax}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </FilterSection>

          <ButtonsRow>
            <ClearButton onPress={handleClearFilters}>
              <Ionicons name="trash-outline" size={20} color="#666" />
              <ClearButtonText>Limpar</ClearButtonText>
            </ClearButton>

            <ApplyButton onPress={handleApplyFilters}>
              <Ionicons name="checkmark" size={20} color="#fff" />
              <ApplyButtonText>Aplicar Filtros</ApplyButtonText>
            </ApplyButton>
          </ButtonsRow>
        </ScrollView>
      </ModalContainer>
      </KeyboardAvoidingView>

      {renderSelectionModal(
        "Selecionar Tipo",
        tipos,
        tipo,
        setTipo,
        showTipoModal,
        () => setShowTipoModal(false)
      )}

      {renderSelectionModal(
        "Selecionar Ano",
        anos,
        anoFabricacao,
        (value) => setAnoFabricacao(value?.toString() || ""),
        showAnoModal,
        () => setShowAnoModal(false)
      )}

      {renderSelectionModal(
        "Selecionar Combustível",
        combustiveis,
        combustivel,
        setCombustivel,
        showCombustivelModal,
        () => setShowCombustivelModal(false)
      )}
    </Modal>
  );
}
