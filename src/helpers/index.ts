export {
  getRandomDirection,
  getCardinalCoords,
  getCardinalDirection,
  getRelativeCoords,
  isCardinalDirection,
  isRelativeDirection,
} from './directions'

export const randomBinary = (length: number) =>
  Math.floor(Math.random() * 2 ** length)
    .toString(2)
    .padStart(length, '0')

export const getColorFromBinary = (paddedBinary: string) => {
  const possible_genome_combinations = 2 ** paddedBinary.length
  const possible_color_combinations = 16 ** 6 - 1
  const current_genome_number = parseInt(paddedBinary, 2)
  const corresponding_hex_number = Math.floor(
    (current_genome_number / possible_genome_combinations) * possible_color_combinations
  )
  const color = corresponding_hex_number.toString(16).padStart(6, '0')
  return `#${color}`
}
