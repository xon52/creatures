import { Creature, World } from '../../classes'
import { gene, geneSignal } from '../../types'

const genes: gene[] = [
  { name: 'Move Forward', run: (c: Creature, w: World, i: geneSignal) => i > 0 && c.moveForward() },
  { name: 'Turn Left', run: (c: Creature, w: World, i: geneSignal) => i > 0 && c.moveForward() },
  { name: 'Turn Right', run: (c: Creature, w: World, i: geneSignal) => i > 0 && c.moveForward() },
]

export default genes
