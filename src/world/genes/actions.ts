import { Creature, GeneAction, World } from '../../classes'

// Helpers
const move = (w: World, c: Creature, x: number, y: number) => {
  if (!w.isValidTile(x, y) || !w.isTileVacant(x, y)) return false
  w.removeOccupant(c.x, c.y)
  w.addOccupant(c, x, y)
  c.moveTo(x, y)
  return true
}

// Genes
export default [
  new GeneAction('Move N', (c: Creature, w: World) => move(w, c, c.x + 0, c.y + 1)),
  new GeneAction('Move NE', (c: Creature, w: World) => move(w, c, c.x + 1, c.y + 1)),
  new GeneAction('Move E', (c: Creature, w: World) => move(w, c, c.x + 1, c.y + 0)),
  new GeneAction('Move SE', (c: Creature, w: World) => move(w, c, c.x + 1, c.y - 1)),
  new GeneAction('Move S', (c: Creature, w: World) => move(w, c, c.x + 0, c.y - 1)),
  new GeneAction('Move SW', (c: Creature, w: World) => move(w, c, c.x - 1, c.y - 1)),
  new GeneAction('Move W', (c: Creature, w: World) => move(w, c, c.x - 1, c.y + 0)),
  new GeneAction('Move NW', (c: Creature, w: World) => move(w, c, c.x - 1, c.y + 1)),
]
