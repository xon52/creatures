import { Creature, GeneProcess, World } from '../../classes'
import { geneSignal } from '../../types';

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
  new GeneProcess('Invert', (c: Creature, w: World, s: geneSignal) => !s),
]
