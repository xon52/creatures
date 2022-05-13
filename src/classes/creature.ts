import { gene } from '../types'
import { GeneLibrary } from './geneLibrary'
import { World } from './world'

export enum direction {
  North,
  East,
  South,
  West,
}

export class Creature {
  constructor(x: number, y: number, genome: string, world: World, library: GeneLibrary) {
    this.x = x
    this.y = y
    this.world = world
    this.genome = genome
    this.genes = library.extract(genome)
  }

  private world: World
  public x: number
  public y: number

  public direction: direction = Math.floor(Math.random() * 4)
  public genome: string
  public genes: gene[] = []

  public getForward = () => {
    if (this.direction === direction.North) return { x: this.x, y: this.y + 1 }
    if (this.direction === direction.East) return { x: this.x + 1, y: this.y }
    if (this.direction === direction.South) return { x: this.x, y: this.y - 1 }
    if (this.direction === direction.West) return { x: this.x - 1, y: this.y }
    throw new Error(`Unknown direction "${this.direction}" in getForward,`)
  }
  public moveForward = () => {
    const { x, y } = this.getForward()
    if (this.world.isValidTile(x, y)) return false
    if (this.world.isTileVacant(x, y)) return false
    this.world.removeOccupant(this.x, this.y)
    this.world.addOccupant(this, x, y)
    this.x = x
    this.y = y
    return true
  }
  public turnLeft = () => {
    this.direction = this.direction === 0 ? 3 : this.direction - 1
    return true
  }
  public turnRight = () => {
    this.direction = this.direction === 3 ? 0 : this.direction + 1
    return true
  }

  // reproduce() {
  //   return new Creature({ x: this.x, y: this.y })
  // }
}
