import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BidConfirmationModal from '../index';

describe('BidConfirmationModal', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o modal quando visível', () => {
    const { getByText } = render(
      <BidConfirmationModal
        visible={true}
        bidValue={25000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(getByText('Confirmar Lance')).toBeTruthy();
    expect(getByText(/Você fez um lance de/)).toBeTruthy();
    expect(getByText('Sim, confirmar lance')).toBeTruthy();
    expect(getByText('Cancelar')).toBeTruthy();
  });

  it('não deve renderizar quando não visível', () => {
    const { queryByText } = render(
      <BidConfirmationModal
        visible={false}
        bidValue={25000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(queryByText('Confirmar Lance')).toBeNull();
  });

  it('deve exibir o valor do lance formatado', () => {
    const { getByText } = render(
      <BidConfirmationModal
        visible={true}
        bidValue={30000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(getByText(/30/)).toBeTruthy();
  });

  it('deve chamar onConfirm ao clicar em confirmar', () => {
    const { getByText } = render(
      <BidConfirmationModal
        visible={true}
        bidValue={25000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('Sim, confirmar lance'));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onCancel ao clicar em cancelar', () => {
    const { getByText } = render(
      <BidConfirmationModal
        visible={true}
        bidValue={25000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('Cancelar'));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar mensagem completa de confirmação', () => {
    const { getByText } = render(
      <BidConfirmationModal
        visible={true}
        bidValue={25000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(getByText(/Deseja confirmar este valor como o seu lance/)).toBeTruthy();
  });

  it('deve funcionar com diferentes valores de lance', () => {
    const { getByText, rerender } = render(
      <BidConfirmationModal
        visible={true}
        bidValue={10000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(getByText(/10/)).toBeTruthy();

    rerender(
      <BidConfirmationModal
        visible={true}
        bidValue={50000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(getByText(/50/)).toBeTruthy();
  });

  it('não deve chamar callbacks quando não visível', () => {
    const { queryByText } = render(
      <BidConfirmationModal
        visible={false}
        bidValue={25000}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(queryByText('Sim, confirmar lance')).toBeNull();
    expect(mockOnConfirm).not.toHaveBeenCalled();
    expect(mockOnCancel).not.toHaveBeenCalled();
  });
});
