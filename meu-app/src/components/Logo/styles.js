import styled from 'styled-components/native';
import { colors, typography } from '../../theme';

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.Text`
  font-size: ${(props) => props.size || typography.fontSize.display}px;
  font-weight: ${typography.fontWeight.bold};
`;

export const BidText = styled(LogoText)`
  color: ${colors.text};
`;

export const LiveText = styled(LogoText)`
  color: ${colors.primary};
`;
