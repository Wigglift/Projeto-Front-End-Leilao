import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';
import { AvatarContainer, AvatarImage, AvatarText } from './styles';

const Avatar = ({
  source,
  size = 64,
  name,
  icon = 'person',
  style,
}) => {
  const iconSize = size * 0.5;

  const renderContent = () => {
    if (source && (source.uri || typeof source === 'number')) {
      return (
        <AvatarImage
          source={source}
          resizeMode="cover"
        />
      );
    }

    if (name) {
      const initials = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      return (
        <AvatarText size={size}>
          {initials}
        </AvatarText>
      );
    }

    return (
      <Ionicons
        name={icon}
        size={iconSize}
        color={colors.avatarIcon}
      />
    );
  };

  return (
    <AvatarContainer size={size} style={style}>
      {renderContent()}
    </AvatarContainer>
  );
};

export default Avatar;
