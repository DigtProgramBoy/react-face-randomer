export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const pushaffle = (rundNum: number) => {
  const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const sortArr = indexes.sort(() => Math.random() - 0.5);
  return sortArr.slice(0, rundNum);
};
