import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: ${spacing.xl}px;
  justify-content: center;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${spacing.xxxl}px;
`;

export const WelcomeTextContainer = styled.View`
  align-items: center;
  margin-bottom: ${spacing.huge}px;
`;

export const WelcomeTitle = styled.Text`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.text};
  text-align: center;
  margin-bottom: ${spacing.base}px;
`;

export const BidLiveText = styled.Text`
  color: ${colors.textLink};
  font-weight: ${typography.fontWeight.bold};
`;

export const Subtitle = styled.Text`
  font-size: ${typography.fontSize.base}px;
  color: ${colors.textSecondary};
  text-align: center;
  line-height: ${typography.lineHeight.relaxed * typography.fontSize.base}px;
`;

export const ButtonsContainer = styled.View`
  gap: ${spacing.base}px;
`;
