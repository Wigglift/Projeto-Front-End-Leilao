import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
`;

export const Image = styled.Image`
  width: 100%;
  height: 180px;
  background-color: #f0f0f0;
`;

export const InfoContainer = styled.View`
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 12px;
  line-height: 20px;
`;

export const CurrentBid = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff5f2;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const BidLabel = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const BidValue = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ff6b35;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const FooterItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FooterText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-left: 6px;
`;
