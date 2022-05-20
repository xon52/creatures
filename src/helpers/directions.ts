const relativeDirections = ['Forward', 'Right', 'Backward', 'Left']
const cardinalDirections = ['North', 'East', 'South', 'West']

const getNextFromArray = (start: string, array: string[], steps: number = 1) => {
  const index = array.indexOf(start)
  if (index < 0) throw new Error(`Could not find the start "${start}" in the array ${JSON.stringify(array)}`)
  if (index + steps < array.length) return array[index + steps]
  return array[index + steps - array.length]
}

export const getRandomDirection = () => cardinalDirections[Math.floor(Math.random() * 4)]
export const getCardinalDirection = (facing: string, relativeDirection: string) => {
  const relativeIndex = relativeDirections.indexOf(relativeDirection)
  if (relativeIndex < 0) throw new Error(`Invalid relative direction "${relativeDirection}"`)
  return getNextFromArray(facing, cardinalDirections, relativeIndex)
}
export const getCardinalCoords = (x: number, y: number, cardinalDirection: string) => {
  if (cardinalDirection === 'North') return { x, y: y + 1 }
  if (cardinalDirection === 'East') return { x, y: y - 1 }
  if (cardinalDirection === 'South') return { x: x + 1, y }
  if (cardinalDirection === 'West') return { x: x - 1, y }
  throw new Error(`Invalid cardinal direction "${cardinalDirection}"`)
}
export const getRelativeCoords = (x: number, y: number, facing: string, relativeDirection: string) => {
  const cardinalDirection = getCardinalDirection(facing, relativeDirection)
  return getCardinalCoords(x, y, cardinalDirection)
}

export const isCardinalDirection = (direction: string) => cardinalDirections.includes(direction)
export const isRelativeDirection = (direction: string) => relativeDirections.includes(direction)
