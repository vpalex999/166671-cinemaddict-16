export const getRandomInteger = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloat = (min = 0.0, max = 1.0, numberDecimals = 1) => {
  const randomValue = Math.random() * (max - min + 1) + min;

  return Number(randomValue.toFixed(numberDecimals));
};

