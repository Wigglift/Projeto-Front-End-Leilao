import { useState, useEffect } from "react";
import { ScrollView, StatusBar, Alert, Modal, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CameraModal from "../../components/styleds/CameraModal";
import Avatar from "../../components/styleds/Avatar";
import { colors } from "../../theme";
import { moderateScale } from "../../utils/responsive";
import { saveUserPhoto, getUserPhoto, removeUserPhoto } from "../../services/userPhotoService";
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  ProfileHeader,
  AvatarWrapper,
  UserName,
  UserEmail,
  Section,
  SectionTitle,
  InfoCard,
  InfoRow,
  InfoLabel,
  InfoValue,
  CameraButton,
} from "./styles";

export default function Profile({ navigation }) {
  const [userPhoto, setUserPhoto] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const user = {
    username: "Usuário",
    email: "usuario@email.com",
  };

  useEffect(() => {
    loadUserPhoto();
  }, []);

  const loadUserPhoto = async () => {
    const photoUri = await getUserPhoto();
    if (photoUri) {
      setUserPhoto(photoUri);
    }
  };

  const handleTakePhoto = () => {
    setShowPhotoOptions(false);
    setShowCamera(true);
  };

  const handleCapture = async (uri) => {
    setShowCamera(false);
    const saved = await saveUserPhoto(uri);
    if (saved) {
      setUserPhoto(uri);
      Alert.alert("Sucesso!", "Foto do perfil atualizada com sucesso.");
    } else {
      Alert.alert("Erro", "Não foi possível salvar a foto. Tente novamente.");
    }
  };

  const handleRemovePhoto = async () => {
    setShowPhotoOptions(false);

    Alert.alert(
      "Remover foto",
      "Deseja realmente remover a foto do perfil?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            const removed = await removeUserPhoto();

            if (removed) {
              setUserPhoto(null);
              Alert.alert("Sucesso!", "Foto do perfil removida com sucesso.", [{ text: "OK" }]);
            } else {
              Alert.alert("Erro", "Não foi possível remover a foto. Tente novamente.", [{ text: "OK" }]);
            }
          },
        },
      ]
    );
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={moderateScale(24)} color={colors.text} />
        </BackButton>
        <HeaderTitle>Perfil</HeaderTitle>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <ProfileHeader>
            <AvatarWrapper>
              <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPhotoOptions(true)}>
                <Avatar
                  size={80}
                  icon="person"
                  source={userPhoto ? { uri: userPhoto } : null}
                />
              </TouchableOpacity>
              <CameraButton onPress={() => setShowPhotoOptions(true)}>
                <Ionicons name="camera" size={moderateScale(20)} color={colors.text} />
              </CameraButton>
            </AvatarWrapper>
            <UserName>{user.username}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </ProfileHeader>

          <Section>
            <SectionTitle>Detalhes do usuário</SectionTitle>
            <InfoCard>
              <InfoRow>
                <InfoLabel>Nome de usuário</InfoLabel>
                <InfoValue>{user.username}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>E-mail</InfoLabel>
                <InfoValue>{user.email}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Senha</InfoLabel>
                <InfoValue>••••••••</InfoValue>
              </InfoRow>
            </InfoCard>
          </Section>
        </Content>
      </ScrollView>

      <Modal
        visible={showPhotoOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPhotoOptions(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setShowPhotoOptions(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: colors.backgroundCard,
              borderRadius: 12,
              padding: 20,
              width: "80%",
              maxWidth: 300,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
              onPress={handleTakePhoto}
            >
              <Ionicons
                name="camera"
                size={24}
                color={colors.primary}
                style={{ marginRight: 10, alignSelf: "center" }}
              />
              <Text style={{ fontSize: 16, color: colors.text, textAlign: "center", marginTop: 5 }}>
                Tirar foto
              </Text>
            </TouchableOpacity>

            {userPhoto && (
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
                onPress={handleRemovePhoto}
              >
                <Ionicons
                  name="trash"
                  size={24}
                  color={colors.error || "#FF3B30"}
                  style={{ marginRight: 10, alignSelf: "center" }}
                />
                <Text style={{ fontSize: 16, color: colors.error || "#FF3B30", textAlign: "center", marginTop: 5 }}>
                  Remover foto
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{ paddingVertical: 15 }}
              onPress={() => setShowPhotoOptions(false)}
            >
              <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: "center" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <CameraModal
        visible={showCamera}
        onCapture={handleCapture}
        onClose={() => setShowCamera(false)}
      />
    </Container>
  );
}
