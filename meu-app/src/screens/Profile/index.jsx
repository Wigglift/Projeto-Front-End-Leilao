import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/styleds/Avatar';
import { colors } from '../../theme';
import { moderateScale } from '../../utils/responsive';
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
} from './styles';

const Profile = ({ navigation }) => {
  const user = {
    username: 'Usuário',
    email: 'usuario@email.com',
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
              <Avatar size={80} icon="person" />
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
    </Container>
  );
};

export default Profile;
