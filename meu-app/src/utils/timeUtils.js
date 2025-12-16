/**
 * Calcula o tempo restante entre agora e uma data futura
 * @param {string} endDate - Data de término no formato ISO
 * @returns {string} - Tempo restante formatado (ex: "2h 30min", "1d 5h")
 */
export const calculateTimeRemaining = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end - now;

  if (diffMs <= 0) {
    return "Encerrado";
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    const remainingHours = diffHours % 24;
    return `${diffDays}d ${remainingHours}h`;
  } else if (diffHours > 0) {
    const remainingMinutes = diffMinutes % 60;
    return `${diffHours}h ${remainingMinutes}min`;
  } else {
    return `${diffMinutes}min`;
  }
};

/**
 * Formata um valor monetário para o padrão brasileiro
 * @param {number} value - Valor numérico
 * @returns {string} - Valor formatado (ex: "3.500,00")
 */
export const formatCurrency = (value) => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// TODO implementar futuramente
/**
 * Verifica se um leilão está ativo
 * @param {string} startDate - Data de início
 * @param {string} endDate - Data de término
 * @param {string} status - Status do leilão
 * @returns {boolean} - true se ativo
 */
export const isAuctionActive = (startDate, endDate, status) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  return status === "ativo" && now >= start && now <= end;
};
