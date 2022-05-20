import { Creature } from '../../classes'
import { gene } from '../../types'

// Helpers
const getNearbyTiles = (x: number, y: number) => [
  { x: x + 0, y: y + 1 },
  { x: x + 1, y: y + 1 },
  { x: x + 1, y: y + 0 },
  { x: x + 1, y: y - 1 },
  { x: x + 0, y: y - 1 },
  { x: x - 1, y: y - 1 },
  { x: x - 1, y: y + 0 },
  { x: x - 1, y: y + 1 },
]

const getNeighbours = (c: Creature) => {
  const neighbours: Creature[] = []
  getNearbyTiles(c.x, c.y).forEach((t) => {
    if (!c.world.isValidTile(t.x, t.y)) return
    const occupant = c.world.getTileOccupant(t.x, t.y)
    if (occupant instanceof Creature) neighbours.push(occupant)
  })
  return neighbours
}

const genes: gene[] = [
  {
    name: 'Is facing edge',
    run: (c: Creature) => {
      const { x, y } = c.getCoordFromDirection('Forward')
      return !c.world.isValidTile(x, y)
    },
  },
  {
    name: 'Is not facing edge',
    run: (c: Creature) => {
      const { x, y } = c.getCoordFromDirection('Forward')
      return c.world.isValidTile(x, y)
    },
  },
  {
    name: 'Is facing creature',
    run: (c: Creature) => {
      const { x, y } = c.getCoordFromDirection('Forward')
      return c.world.isValidTile(x, y) && c.world.getTileOccupant(x, y) instanceof Creature
    },
  },
  {
    name: 'Is not facing creature',
    run: (c: Creature) => {
      const { x, y } = c.getCoordFromDirection('Forward')
      return c.world.isValidTile(x, y) && !(c.world.getTileOccupant(x, y) instanceof Creature)
    },
  },
  { name: 'Is crowded', run: (c: Creature) => getNeighbours(c).length > 4 },
  { name: 'Is not crowded', run: (c: Creature) => getNeighbours(c).length < 3 },
]

export default genes
