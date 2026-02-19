import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Input from "../../components/styleds/Input";
import Button from "../../components/styleds/Button";
import Checkbox from "../../components/styleds/Checkbox";
import TextLink from "../../components/styleds/TextLink";
import authService from "../../services/authService";
import {
  Container,
  Header,
  Title,
  Subtitle,
  FormContainer,
  OptionsRow,
  SignUpContainer,
  SignUpText,
} from "./styles";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await authService.login(username, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Erro no Login",
        error.message || "Não foi possível fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Header>
              <Title>Sistema de Leilão</Title>
              <Subtitle>Por favor, faça login na sua conta existente.</Subtitle>
            </Header>

            <FormContainer>
              <Input
                label="USUÁRIO"
                placeholder="Digite seu usuário..."
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />

              <Input
                label="SENHA"
                placeholder="Digite sua senha..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPasswordToggle
              />

              <OptionsRow>
                <Checkbox
                  label="Lembrar de mim"
                  checked={rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                />

                <TextLink text="Esqueci senha" onPress={() => {}} />
              </OptionsRow>

              <Button
                title={loading ? "Entrando..." : "Entrar"}
                onPress={handleLogin}
                variant="primary"
                disabled={loading}
              />

              <SignUpContainer>
                <SignUpText>Não possui conta? </SignUpText>
                <TextLink text="Criar conta" onPress={() => {}} bold />
              </SignUpContainer>
            </FormContainer>
          </ScrollView>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
