import { Creature, World } from '../../classes'
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

const getNeighbours = (w: World, x: number, y: number) => {
  const neighbours: Creature[] = []
  getNearbyTiles(x, y).forEach((t) => {
    const occupant = w.getTileOccupant(t.x, t.y)
    if (occupant instanceof Creature) neighbours.push(occupant)
  })
  return neighbours
}

const genes: gene[] = [
  {
    name: 'Is facing edge',
    run: (c: Creature, w: World) => {
      const { x, y } = c.getForward()
      return !w.isValidTile(x, y)
    },
  },
  {
    name: 'Is not facing edge',
    run: (c: Creature, w: World) => {
      const { x, y } = c.getForward()
      return w.isValidTile(x, y)
    },
  },
  {
    name: 'Is facing creature',
    run: (c: Creature, w: World) => {
      const { x, y } = c.getForward()
      return w.getTileOccupant(x, y) instanceof Creature
    },
  },
  {
    name: 'Is not facing creature',
    run: (c: Creature, w: World) => {
      const { x, y } = c.getForward()
      return !(w.getTileOccupant(x, y) instanceof Creature)
    },
  },
  { name: 'Is crowded', run: (c: Creature, w: World) => getNeighbours(w, c.x, c.y).length > 4 },
  { name: 'Is not crowded', run: (c: Creature, w: World) => getNeighbours(w, c.x, c.y).length < 3 },
]

export default genes
