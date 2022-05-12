import { Creature, World } from '../classes'

const config = {
  mutationChance: 0.001,
  worldX: 1000,
  worldY: 1000,
  creatureCount: 100,
  steps: 100,
  generations: 10,
}

let world: World
const creatures: Creature[] = []

const setup = () => {
  world = new World(config.worldX, config.worldY)
  for (let i = 0; i < config.creatureCount; i++) {
    const { x: _x, y: _y } = world.getRandomFreeTile()
    const _c = new Creature(_x, _y)
    creatures.push(_c)
    world.addOccupant(_c, _x, _y)
  }
}
