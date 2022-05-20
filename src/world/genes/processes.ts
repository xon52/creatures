import { Creature } from '../../classes'
import { gene, geneSignal } from '../../types'

const genes: gene[] = [{ name: 'Invert', run: (c: Creature, i: geneSignal) => !i }]

export default genes
