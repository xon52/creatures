import { Creature, World } from '../classes'

export type geneSignal = boolean | number

export type gene = {
  name: string
  run: (creature: Creature, world: World, input: geneSignal) => geneSignal
}
