import {
  getCardinalCoords,
  getCardinalDirection,
  getColorFromBinary,
  getRandomDirection,
  getRelativeCoords,
  isCardinalDirection,
  isRelativeDirection,
} from '../helpers'
import { gene, geneSignal } from '../types'
import { GeneLibrary } from './geneLibrary'
import { World } from './world'

// Direction: 0 North, 1 East, 2 South, 3, West

export class Creature {
  constructor(x: number, y: number, genome: string, world: World, library: GeneLibrary) {
    this.x = x
    this.y = y
    this.world = world
    this.genome = genome
    this.genes = library.extract(genome)
    this.color = getColorFromBinary(genome)
  }

  public world: World
  public x: number
  public y: number
  public color: string

  public direction: string = getRandomDirection()
  public genome: string
  public genes: gene[] = []

  public setPosition = (pos: { x: number; y: number }) => {
    this.x = pos.x
    this.y = pos.y
  }

  public getCoordFromDirection = (direction: string) => {
    if (isCardinalDirection(direction)) return getCardinalCoords(this.x, this.y, direction)
    else if (isRelativeDirection(direction)) return getRelativeCoords(this.x, this.y, this.direction, direction)
    else throw new Error(`Invalid move direction "${direction}"`)
  }

  public move = (direction: string) => {
    const { x, y } = this.getCoordFromDirection(direction)
    if (!this.world.isValidTile(x, y)) {
      return false
    }
    if (!this.world.isTileVacant(x, y)) {
      return false
    }
    this.world.removeOccupant(this.x, this.y)
    this.world.addOccupant(this, x, y)
    this.setPosition({ x, y })
    return true
  }

  public turnLeft = () => {
    this.direction = getCardinalDirection(this.direction, 'Left')
    return true
  }
  public turnRight = () => {
    this.direction = getCardinalDirection(this.direction, 'Right')
    return true
  }

  public run = () => {
    let prevSignal: geneSignal = undefined
    this.genes.forEach((g) => {
      if (g === undefined) return (prevSignal = undefined)
      prevSignal = g.run(this, prevSignal)
    })
  }
}
