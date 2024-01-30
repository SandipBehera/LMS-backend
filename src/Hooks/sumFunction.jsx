export function addNumbers(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
