import { calculateTimeRemaining, formatCurrency } from '../timeUtils';

describe('TimeUtils', () => {
  describe('formatCurrency', () => {
    it('deve formatar moeda corretamente', () => {
      expect(formatCurrency(1000)).toMatch(/R\$.*1\.000,00/);
      expect(formatCurrency(25000)).toMatch(/R\$.*25\.000,00/);
      expect(formatCurrency(100)).toMatch(/R\$.*100,00/);
    });

    it('deve lidar com zero', () => {
      expect(formatCurrency(0)).toMatch(/R\$.*0,00/);
    });

    it('deve lidar com números grandes', () => {
      expect(formatCurrency(1000000)).toMatch(/R\$.*1\.000\.000,00/);
    });

    it('deve lidar com valores decimais', () => {
      const result = formatCurrency(1250.50);
      expect(result).toContain('R$');
      expect(result).toContain('1.250');
    });
  });

  describe('calculateTimeRemaining', () => {
    it('deve retornar "Encerrado" para datas passadas', () => {
      const pastDate = new Date('2020-01-01').toISOString();
      expect(calculateTimeRemaining(pastDate)).toBe('Encerrado');
    });

    it('deve calcular dias restantes para datas futuras', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      const result = calculateTimeRemaining(futureDate.toISOString());
      expect(result).toMatch(/\d+d/);
    });

    it('deve calcular horas restantes para o mesmo dia', () => {
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 3);
      const result = calculateTimeRemaining(futureDate.toISOString());
      expect(result).toMatch(/\d+h/);
    });

    it('deve lidar com datas inválidas', () => {
      const result = calculateTimeRemaining('invalid-date');
      expect(result).toMatch(/NaN|inválida|Encerrado/);
    });
  });
});
