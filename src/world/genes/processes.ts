import { Creature, World } from '../../classes'
import { gene, geneSignal } from '../../types'

const genes: gene[] = [{ name: 'Invert', run: (c: Creature, w: World, i: geneSignal) => !i }]

export default genes
