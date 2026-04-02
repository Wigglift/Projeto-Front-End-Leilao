import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme';
import { ButtonContainer, ButtonText, IconWrapper } from './styles';

const StyledButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary'
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left', // 'left' | 'right'
  iconSize = 20,
  style,
  ...props
}) => {
  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconColor = variant === 'secondary' ? colors.buttonSecondaryText : colors.buttonPrimaryText;
    
    return (
      <IconWrapper hasText={!!title}>
        <Ionicons name={icon} size={iconSize} color={iconColor} />
      </IconWrapper>
    );
  };

  const renderContent = () => {
    if (loading) {
      const spinnerColor = variant === 'secondary' ? colors.buttonSecondaryText : colors.buttonPrimaryText;
      return <ActivityIndicator color={spinnerColor} size="small" />;
    }

    return (
      <>
        {icon && iconPosition === 'left' && renderIcon()}
        {title && <ButtonText variant={variant}>{title}</ButtonText>}
        {icon && iconPosition === 'right' && renderIcon()}
      </>
    );
  };

  return (
    <ButtonContainer
      onPress={handlePress}
      variant={variant}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={style}
      {...props}
    >
      {renderContent()}
    </ButtonContainer>
  );
};

export default StyledButton;
