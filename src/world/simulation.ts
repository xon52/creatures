import { Creature, World, GeneLibrary } from '../classes'
import { randomBinary } from '../helpers'
import genes from './genes'

const config = {
  mutationChance: 0.001,
  worldX: 1000,
  worldY: 1000,
  creatureCount: 100,
  steps: 100,
  generations: 10,
  geneLength: 4,
  genomeLength: 20,
}

let world: World
let library: GeneLibrary
const creatures: Creature[] = []

export const setup = () => {
  world = new World(config.worldX, config.worldY)
  library = new GeneLibrary(genes, config.geneLength)
  for (let i = 0; i < config.creatureCount; i++) {
    const { x: _x, y: _y } = world.getRandomFreeTile()
    const _c = new Creature(_x, _y, randomBinary(config.genomeLength), world, library)
    creatures.push(_c)
    world.addOccupant(_c, _x, _y)
  }
  console.log(world)
  console.log(creatures)
}
