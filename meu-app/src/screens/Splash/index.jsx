import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../components/Logo';
import { colors } from '../../theme';
import { Container } from './styles';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Logo size={48} />
    </Container>
  );
};

export default Splash;
