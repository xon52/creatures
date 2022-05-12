import { Creature, World } from '../classes'

export type geneSignal = boolean | number

export type actionCallback = (creature: Creature, world: World, input: geneSignal) => boolean
export type processCallback = (creature: Creature, world: World, input: geneSignal) => geneSignal
export type sensorCallback = (creature: Creature, world: World) => geneSignal

export type geneCallback = actionCallback | processCallback | sensorCallback
