// Formata número para moeda BR 
export function formatCurrencyBR(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return "";
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Converte texto digitado para número 
export function parseCurrencyBR(value) {
  if (!value) return 0;

  return Number(value.replace(/\D/g, "")) / 100;
}