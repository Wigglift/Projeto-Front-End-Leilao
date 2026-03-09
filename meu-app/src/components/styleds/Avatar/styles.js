import styled from 'styled-components/native';
import { colors } from '../../../theme';

export const AvatarContainer = styled.View`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: ${colors.avatarBackground};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AvatarText = styled.Text`
  font-size: ${(props) => props.size * 0.35}px;
  font-weight: 600;
  color: ${colors.avatarIcon};
`;
