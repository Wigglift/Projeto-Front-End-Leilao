import React from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../components/Logo';
import StyledButton from '../../components/styleds/StyledButton';
import { colors } from '../../theme';
import {
  Container,
  LogoContainer,
  WelcomeTextContainer,
  WelcomeTitle,
  BidLiveText,
  Subtitle,
  ButtonsContainer,
} from './styles';

const Welcome = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <LogoContainer>
        <Logo size={48} />
      </LogoContainer>

      <WelcomeTextContainer>
        <WelcomeTitle>
          Seja bem-vindo ao <BidLiveText>BidLive</BidLiveText>!
        </WelcomeTitle>
        <Subtitle>
          A plataforma onde você encontra os leilões mais{'\n'}
          exclusivos em tempo real.
        </Subtitle>
      </WelcomeTextContainer>

      <ButtonsContainer>
        <StyledButton
          title="Log In"
          onPress={handleLogin}
          variant="primary"
        />
        <StyledButton
          title="Criar Conta"
          onPress={handleSignUp}
          variant="secondary"
        />
      </ButtonsContainer>
    </Container>
  );
};

export default Welcome;
