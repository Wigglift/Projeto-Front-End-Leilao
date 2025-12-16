import { useState } from "react";
import Input from "../../components/styleds/Input";
import Button from "../../components/styleds/Button";
import Checkbox from "../../components/styleds/Checkbox";
import TextLink from "../../components/styleds/TextLink";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <Container>
      <Header>
        <Title>Sistema de Leilão</Title>
        <Subtitle>Por favor, faça login na sua conta existente.</Subtitle>
      </Header>

      <FormContainer>
        <Input
          label="E-MAIL"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="SENHA"
          placeholder="••••••••••"
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

        <Button title="Entrar" onPress={handleLogin} variant="primary" />

        <SignUpContainer>
          <SignUpText>Não possui conta? </SignUpText>
          <TextLink text="Criar conta" onPress={() => {}} bold />
        </SignUpContainer>
      </FormContainer>
    </Container>
  );
}
