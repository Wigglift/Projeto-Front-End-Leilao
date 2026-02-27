import styled from 'styled-components/native';
import { colors, typography, spacing, borderRadius } from '../../theme';

export const Container = styled.View`
    flex: 1;
    background-color: ${colors.background};
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding-left: ${spacing.lg}px;
    padding-right: ${spacing.lg}px;
    padding-top: ${spacing.xxl}px;
    padding-bottom: ${spacing.lg}px;
    background-color: ${colors.primaryDark};
`;

export const BackButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    margin-right: ${spacing.base}px;
`;

export const HeaderTitle = styled.Text`
    font-size: ${typography.fontSize.xxl}px;
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text};
`;

export const Content = styled.View`
    flex: 1;
`;

export const ProfileHeader = styled.View`
    align-items: center;
    padding-top: ${spacing.xl}px;
    padding-bottom: ${spacing.xl}px;
    padding-left: ${spacing.xl}px;
    padding-right: ${spacing.xl}px;
    background-color: ${colors.backgroundCard};
    margin-top: ${spacing.lg}px;
    margin-bottom: ${spacing.lg}px;
    margin-left: ${spacing.lg}px;
    margin-right: ${spacing.lg}px;
    border-radius: ${borderRadius.lg}px;
`;

export const AvatarWrapper = styled.View`
    margin-bottom: ${spacing.base}px;
`;

export const UserName = styled.Text`
    font-size: ${typography.fontSize.xxl}px;
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text};
    margin-bottom: ${spacing.xs}px;
`;

export const UserEmail = styled.Text`
    font-size: ${typography.fontSize.base}px;
    color: ${colors.textSecondary};
`;

export const Section = styled.View`
    padding-left: ${spacing.lg}px;
    padding-right: ${spacing.lg}px;
    margin-bottom: ${spacing.xl}px;
`;

export const SectionTitle = styled.Text`
    font-size: ${typography.fontSize.xl}px;
    font-weight: ${typography.fontWeight.semiBold};
    color: ${colors.text};
    margin-bottom: ${spacing.base}px;
`;

export const InfoCard = styled.View`
    background-color: ${colors.backgroundCard};
    border-radius: ${borderRadius.lg}px;
    padding-top: ${spacing.base}px;
    padding-bottom: ${spacing.base}px;
    padding-left: ${spacing.lg}px;
    padding-right: ${spacing.lg}px;
`;

export const InfoRow = styled.View`
    padding-top: ${spacing.base}px;
    padding-bottom: ${spacing.base}px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.border};
`;

export const InfoLabel = styled.Text`
    font-size: ${typography.fontSize.sm}px;
    color: ${colors.textSecondary};
    margin-bottom: ${spacing.xs}px;
`;

export const InfoValue = styled.Text`
    font-size: ${typography.fontSize.base}px;
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.text};
`;
