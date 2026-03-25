import { useRef, useState } from "react";
import { Modal, ActivityIndicator, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme";
import {
  Container,
  Overlay,
  Header,
  HeaderTitle,
  IconButton,
  GuideContainer,
  GuideCircle,
  Footer,
  CaptureButton,
  CaptureInner,
  PermissionContainer,
  PermissionText,
  PermissionButton,
  PermissionButtonText,
  CancelLink,
  CancelLinkText,
} from "./styles";

export default function CameraModal({ visible, onCapture, onClose }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("front");
  const [isTaking, setIsTaking] = useState(false);
  const cameraRef = useRef(null);

  const handleTakePicture = async () => {
    if (!cameraRef.current || isTaking) return;

    try {
      setIsTaking(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      onCapture(photo.uri);
    } catch (error) {
      console.error("Erro ao tirar foto:", error);
    } finally {
      setIsTaking(false);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  if (!visible) return null;

  if (!permission) {
    return (
      <Modal visible={visible} animationType="slide">
        <PermissionContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </PermissionContainer>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <PermissionContainer>
          <Ionicons name="camera-off" size={64} color={colors.textSecondary} />
          <PermissionText>
            É necessário permitir o acesso à câmera.
          </PermissionText>
          <PermissionButton onPress={requestPermission}>
            <PermissionButtonText>Permitir câmera</PermissionButtonText>
          </PermissionButton>
          <CancelLink onPress={onClose}>
            <CancelLinkText>Cancelar</CancelLinkText>
          </CancelLink>
        </PermissionContainer>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent>
      <Container>
        <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing} />

        <Overlay>
          <Header>
            <IconButton onPress={onClose}>
              <Ionicons name="close" size={28} color="#fff" />
            </IconButton>
            <HeaderTitle>Foto de perfil</HeaderTitle>
            <IconButton onPress={toggleFacing}>
              <Ionicons name="camera-reverse" size={28} color="#fff" />
            </IconButton>
          </Header>

          <GuideContainer>
            <GuideCircle />
          </GuideContainer>

          <Footer>
            <CaptureButton onPress={handleTakePicture} disabled={isTaking}>
              {isTaking ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <CaptureInner />
              )}
            </CaptureButton>
          </Footer>
        </Overlay>
      </Container>
    </Modal>
  );
}
