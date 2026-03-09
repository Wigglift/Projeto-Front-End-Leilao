import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuDrawer from '../index';

describe('MenuDrawer', () => {
  const mockOnClose = jest.fn();
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o menu quando visível', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    expect(getByText('Menu')).toBeTruthy();
    expect(getByText('Início')).toBeTruthy();
    expect(getByText('Meu Perfil')).toBeTruthy();
    expect(getByText('Meus Lances')).toBeTruthy();
    expect(getByText('Favoritos')).toBeTruthy();
    expect(getByText('Configurações')).toBeTruthy();
    expect(getByText('Sair')).toBeTruthy();
  });

  it('não deve renderizar quando não visível', () => {
    const { queryByText } = render(
      <MenuDrawer visible={false} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    expect(queryByText('Menu')).toBeNull();
  });

  it('deve chamar onClose ao clicar no botão fechar', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    const closeButton = getByText('Menu').parent.parent;
    fireEvent.press(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('deve chamar onClose ao clicar em item do menu', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    fireEvent.press(getByText('Início'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onLogout ao clicar em Sair', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    fireEvent.press(getByText('Sair'));

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar todos os itens do menu', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    const menuItems = [
      'Início',
      'Meu Perfil',
      'Meus Lances',
      'Favoritos',
      'Configurações',
      'Sair',
    ];

    menuItems.forEach((item) => {
      expect(getByText(item)).toBeTruthy();
    });
  });

  it('deve fechar ao clicar em Meu Perfil', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    fireEvent.press(getByText('Meu Perfil'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve fechar ao clicar em Meus Lances', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    fireEvent.press(getByText('Meus Lances'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve fechar ao clicar em Favoritos', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    fireEvent.press(getByText('Favoritos'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve fechar ao clicar em Configurações', () => {
    const { getByText } = render(
      <MenuDrawer visible={true} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

    fireEvent.press(getByText('Configurações'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
