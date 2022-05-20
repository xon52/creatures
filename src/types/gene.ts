import { Creature } from '../classes'

export type geneSignal = boolean | number | undefined

export type gene = {
  name: string
  run: (creature: Creature, input: geneSignal) => geneSignal
}
