export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randNumSign = () => {
  const randNum = Math.random();
  return randNum > 0.5 ? 1 : -1;
};

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
