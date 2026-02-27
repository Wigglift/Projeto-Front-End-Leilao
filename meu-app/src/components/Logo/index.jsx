import React from 'react';
import { LogoContainer, BidText, LiveText } from './styles';

const Logo = ({ size, style }) => {
  return (
    <LogoContainer style={style}>
      <BidText size={size}>Bid</BidText>
      <LiveText size={size}>Live</LiveText>
    </LogoContainer>
  );
};

export default Logo;
