import React, { useState } from 'react';
import { StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '../../components/styleds/Input';
import Button from '../../components/styleds/Button';
import { colors } from '../../theme';
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  BidLiveText,
  Form,
  Footer,
  FooterText,
  LinkText,
} from './styles';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 1500);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Content>
            <Header>
              <Title>Criar Conta</Title>
              <Subtitle>
                Crie sua conta para poder ter acesso ao <BidLiveText>BidLive</BidLiveText>.
              </Subtitle>
            </Header>

            <Form>
              <Input
                label="NOME DE USUÁRIO"
                placeholder="Usuário"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Input
                label="E-MAIL"
                placeholder="exemplo@gmail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="SENHA"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPasswordToggle
              />
            </Form>

            <Button
              title={loading ? "Cadastrando..." : "Cadastrar"}
              onPress={handleSignUp}
              variant="primary"
              disabled={!name || !email || !password || loading}
            />

            <Footer>
              <FooterText>
                Já possui conta?{' '}
                <LinkText onPress={handleLogin}>Entrar</LinkText>
              </FooterText>
            </Footer>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUp;
