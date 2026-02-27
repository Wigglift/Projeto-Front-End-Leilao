import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${spacing.xl}px;
  justify-content: center;
`;

export const Header = styled.View`
  margin-bottom: ${spacing.xxxl}px;
`;

export const Title = styled.Text`
  font-size: ${typography.fontSize.xxxl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.sm}px;
`;

export const Subtitle = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
`;

export const BidLiveText = styled.Text`
  color: ${colors.textLink};
  font-weight: ${typography.fontWeight.bold};
`;

export const Form = styled.View`
  margin-bottom: ${spacing.xl}px;
`;

export const Footer = styled.View`
  align-items: center;
  margin-top: ${spacing.base}px;
`;

export const FooterText = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
`;

export const LinkText = styled.Text`
  color: ${colors.textLink};
  font-weight: ${typography.fontWeight.semiBold};
`;
