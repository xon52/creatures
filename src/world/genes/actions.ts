import { Creature } from '../../classes'
import { gene, geneSignal } from '../../types'

const genes: gene[] = [
  { name: 'Move Forward', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('Forward') },
  { name: 'Move Backward', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('Backward') },
  { name: 'Move Right', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('Right') },
  { name: 'Move Left', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('Left') },
  { name: 'Move North', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('North') },
  { name: 'Move South', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('South') },
  { name: 'Move East', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('East') },
  { name: 'Move West', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.move('West') },
  { name: 'Turn Left', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.turnLeft() },
  { name: 'Turn Right', run: (c: Creature, i: geneSignal) => (i === undefined || i > 0) && c.turnRight() },
]

export default genes
