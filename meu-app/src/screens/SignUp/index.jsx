import React, { useState } from 'react';
import { StatusBar, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Input from '../../components/styleds/Input';
import Button from '../../components/styleds/Button';
import localUserService from '../../services/localUserService';
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
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await localUserService.registerUser(name, email, password);
      Alert.alert('Conta criada!', 'Seu cadastro foi realizado com sucesso.', [
        { text: 'Entrar', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Erro no cadastro', error.message);
    } finally {
      setLoading(false);
    }
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
