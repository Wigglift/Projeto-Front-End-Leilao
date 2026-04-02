import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryChip from '../index';

describe('CategoryChip', () => {
  it('deve renderizar com label e ícone', () => {
    const { getByText } = render(
      <CategoryChip label="Seguradoras" icon="shield-checkmark-outline" />
    );

    expect(getByText('Seguradoras')).toBeTruthy();
  });

  it('deve renderizar sem ícone quando não fornecido', () => {
    const { getByText } = render(<CategoryChip label="Todos" />);

    expect(getByText('Todos')).toBeTruthy();
  });

  it('deve chamar onPress quando clicado', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CategoryChip label="Bancos" icon="business-outline" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Bancos'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar estilo selected quando selecionado', () => {
    const { getByText } = render(
      <CategoryChip label="Seguradoras" icon="shield-checkmark-outline" selected={true} />
    );

    expect(getByText('Seguradoras')).toBeTruthy();
  });

  it('deve aplicar estilo não selecionado por padrão', () => {
    const { getByText } = render(
      <CategoryChip label="Seguradoras" icon="shield-checkmark-outline" />
    );

    expect(getByText('Seguradoras')).toBeTruthy();
  });

  it('deve renderizar múltiplos chips corretamente', () => {
    const { getByText } = render(
      <>
        <CategoryChip label="Todos" icon="trophy-outline" selected={true} />
        <CategoryChip label="Seguradoras" icon="shield-checkmark-outline" />
        <CategoryChip label="Bancos" icon="business-outline" />
      </>
    );

    expect(getByText('Todos')).toBeTruthy();
    expect(getByText('Seguradoras')).toBeTruthy();
    expect(getByText('Bancos')).toBeTruthy();
  });
});
