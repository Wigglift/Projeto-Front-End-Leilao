import { Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {formatCurrency} from "../../../utils/timeUtils";
import {
  ModalOverlay,
  ModalContainer,
  IconContainer,
  MoneyIcon,
  CheckIcon,
  ModalTitle,
  ModalMessage,
  ConfirmButton,
  ConfirmButtonText,
  CancelButton,
  CancelButtonText,
} from "./styles";

export default function BidConfirmationModal({
  visible,
  bidValue,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <ModalOverlay>
          <TouchableWithoutFeedback>
            <ModalContainer>
              <IconContainer>
                <MoneyIcon>
                  <Ionicons
                    name="cash-outline"
                    size={48}
                    color="#4CAF50"
                  />
                </MoneyIcon>
                <CheckIcon>
                  <Ionicons name="checkmark" size={24} color="#4CAF50" />
                </CheckIcon>
              </IconContainer>

              <ModalTitle>Confirmar Lance</ModalTitle>
              <ModalMessage>
                Você fez um lance de {formatCurrency(bidValue)}. Deseja
                confirmar este valor como o seu lance?
              </ModalMessage>

              <ConfirmButton onPress={onConfirm}>
                <ConfirmButtonText>Sim, confirmar lance</ConfirmButtonText>
              </ConfirmButton>

              <CancelButton onPress={onCancel}>
                <CancelButtonText>Cancelar</CancelButtonText>
              </CancelButton>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
