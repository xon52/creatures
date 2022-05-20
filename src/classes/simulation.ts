import { Creature, World, GeneLibrary } from '.'
import { randomBinary } from '../helpers'
import { simulationConfig } from '../types'
import genes from '../world/genes'

export class Simulation {
  constructor(config: simulationConfig) {
    this.config = config
    this.world = new World(config.worldX, config.worldY)
    this.library = new GeneLibrary(genes, config.geneLength)
    this.creatures = []
    for (let i = 0; i < config.creatureCount; i++) this.addRandomCreature()
  }

  public config: simulationConfig
  public world: World
  public library: GeneLibrary
  public creatures: Creature[]

  public addRandomCreature() {
    const { x: _x, y: _y } = this.world.getRandomVacantTile()
    const randomGenome = randomBinary(this.config.genomeLength)
    const _c = new Creature(_x, _y, randomGenome, this.world, this.library)
    this.creatures.push(_c)
    this.world.addOccupant(_c, _x, _y)
  }
  public duplicateRandomCreature() {
    const randC = this.creatures[Math.floor(Math.random() * this.creatures.length)]
    const { x: _x, y: _y } = this.world.getRandomVacantTile()
    const _c = new Creature(_x, _y, randC.genome, this.world, this.library)
    this.creatures.push(_c)
    this.world.addOccupant(_c, _x, _y)
  }

  public step() {
    this.creatures.forEach((c) => c.run())
  }

  public filter1() {
    this.creatures = this.creatures.filter((c) => c.x > this.world.x / 2)
    this.world.clearWorld()
    this.creatures.forEach((c) => c.setPosition(this.world.getRandomVacantTile()))
    while (this.creatures.length < this.config.creatureCount) this.duplicateRandomCreature()
  }
}
