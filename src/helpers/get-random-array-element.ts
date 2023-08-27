export function getRandomElementFromArray<T>(array: T[]): T {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}
