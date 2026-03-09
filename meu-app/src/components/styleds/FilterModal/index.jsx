import { useState, useEffect } from "react";
import { Modal, TouchableWithoutFeedback, ScrollView, Alert, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import auctionService from "../../../services/auctionService";
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

export default function FilterModal({ visible, onClose, onApplyFilters }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedAuctioneer, setSelectedAuctioneer] = useState("");
  
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [auctioneers, setAuctioneers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCityModal, setShowCityModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showAuctioneerModal, setShowAuctioneerModal] = useState(false);

  useEffect(() => {
    if (visible) {
      loadFilterOptions();
    }
  }, [visible]);

  const loadFilterOptions = async () => {
    try {
      setLoading(true);

      const locationsData = await auctionService.getCitiesAndStates();

      const uniqueCities = [...new Set(locationsData.map(l => l.cidade))].filter(Boolean);
      const uniqueStates = [...new Set(locationsData.map(l => l.estado))].filter(Boolean);
      
      setCities(uniqueCities);
      setStates(uniqueStates);

      const auctioneersData = await auctionService.getAuctioneers();
      const auctioneerNames = auctioneersData
        .map(item => typeof item === 'string' ? item : item?.leiloeiro)
        .filter(Boolean);
      setAuctioneers(auctioneerNames);
    } catch (error) {
      console.error("Erro ao carregar opções de filtro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedCity("");
    setSelectedState("");
    setSelectedAuctioneer("");
  };

  const handleApplyFilters = () => {
    const filters = {
      startDate: startDate || null,
      endDate: endDate || null,
      city: selectedCity || null,
      state: selectedState || null,
      auctioneer: selectedAuctioneer || null,
    };

    const hasFilters = Object.values(filters).some(value => value !== null);
    
    if (!hasFilters) {
      Alert.alert("Atenção", "Selecione pelo menos um filtro para aplicar");
      return;
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        Alert.alert("Erro", "A data inicial não pode ser maior que a data final");
        return;
      }
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
                      backgroundColor: selectedValue === item ? "#fff5f2" : "transparent",
                      borderBottomWidth: 1,
                      borderBottomColor: "#f0f0f0",
                      marginVertical: 8,
                    }}
                  >
                    <PickerText hasValue={selectedValue === item}>
                      {item}
                    </PickerText>
                    {selectedValue === item && (
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
            <ModalTitle>Filtros Avançados</ModalTitle>
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
                  <Ionicons name="calendar-outline" size={20} color="#ff6b35" />
                  <FilterLabelText>Período do Leilão</FilterLabelText>
                </FilterLabel>

                <FilterInput
                  placeholder="Data Inicial (YYYY-MM-DD)"
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholderTextColor="#999"
                />

                <FilterInput
                  placeholder="Data Final (YYYY-MM-DD)"
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholderTextColor="#999"
                />
              </FilterSection>

              <FilterSection>
                  <FilterLabel>
                    <Ionicons name="location-outline" size={20} color="#ff6b35" />
                    <FilterLabelText>Localidade</FilterLabelText>
                  </FilterLabel>

                  <PickerContainer>
                    <PickerButton 
                      onPress={() => setShowCityModal(true)}
                      disabled={loading}
                      style={{ opacity: loading ? 0.5 : 1 }}
                    >
                      <PickerText hasValue={!!selectedCity}>
                        {loading ? "Carregando..." : (selectedCity || "Selecione a cidade")}
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

                  <PickerContainer>
                    <PickerButton 
                      onPress={() => setShowStateModal(true)}
                      disabled={loading}
                      style={{ opacity: loading ? 0.5 : 1 }}
                    >
                      <PickerText hasValue={!!selectedState}>
                        {loading ? "Carregando..." : (selectedState || "Selecione o estado")}
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
                    <Ionicons name="person-outline" size={20} color="#ff6b35" />
                    <FilterLabelText>Leiloeiro</FilterLabelText>
                  </FilterLabel>

                  <PickerContainer>
                    <PickerButton 
                      onPress={() => setShowAuctioneerModal(true)}
                      disabled={loading}
                      style={{ opacity: loading ? 0.5 : 1 }}
                    >
                      <PickerText hasValue={!!selectedAuctioneer}>
                        {loading ? "Carregando..." : (selectedAuctioneer || "Selecione o leiloeiro")}
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
        "Selecionar Cidade",
        cities,
        selectedCity,
        setSelectedCity,
        showCityModal,
        () => setShowCityModal(false)
      )}
      
      {renderSelectionModal(
        "Selecionar Estado",
        states,
        selectedState,
        setSelectedState,
        showStateModal,
        () => setShowStateModal(false)
      )}
      
      {renderSelectionModal(
        "Selecionar Leiloeiro",
        auctioneers,
        selectedAuctioneer,
        setSelectedAuctioneer,
        showAuctioneerModal,
        () => setShowAuctioneerModal(false)
      )}
    </Modal>
  );
}
