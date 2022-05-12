import { Creature, GeneSensor, World } from '../../classes'

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
const canMove = (w: World, x: number, y: number) => w.isValidTile(x, y) && w.isTileVacant(x, y)
const getNeighbours = (w: World, x: number, y: number) => {
  const neighbours: Creature[] = []
  getNearbyTiles(x, y).forEach((t) => {
    const occupant = w.getTileOccupant(t.x, t.y)
    if (occupant instanceof Creature) neighbours.push(occupant)
  })
  return neighbours
}

// Genes
export default [
  new GeneSensor('Can move N', (c: Creature, w: World) => canMove(w, c.x + 0, c.y + 1)),
  new GeneSensor('Can move NE', (c: Creature, w: World) => canMove(w, c.x + 1, c.y + 1)),
  new GeneSensor('Can move E', (c: Creature, w: World) => canMove(w, c.x + 1, c.y + 0)),
  new GeneSensor('Can move SE', (c: Creature, w: World) => canMove(w, c.x + 1, c.y - 1)),
  new GeneSensor('Can move S', (c: Creature, w: World) => canMove(w, c.x + 0, c.y - 1)),
  new GeneSensor('Can move SW', (c: Creature, w: World) => canMove(w, c.x - 1, c.y - 1)),
  new GeneSensor('Can move W', (c: Creature, w: World) => canMove(w, c.x - 1, c.y + 0)),
  new GeneSensor('Can move NW', (c: Creature, w: World) => canMove(w, c.x - 1, c.y + 1)),
  new GeneSensor('Is crowded', (c: Creature, w: World) => getNeighbours(w, c.x, c.y).length > 4),
  new GeneSensor('Is not crowded', (c: Creature, w: World) => getNeighbours(w, c.x, c.y).length < 3),
]
