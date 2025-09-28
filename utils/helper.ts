export const formattedPrice = (price: number | undefined | null): string => {
  const formattedPrice = new Number(price).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });

  return formattedPrice;
};
