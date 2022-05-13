export const randomBinary = (length: number) =>
  Math.floor(Math.random() * 2 ** length)
    .toString(2)
    .padStart(length, '0')
