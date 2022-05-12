import { stats } from '../types'
import { GeneSequence } from '.'

export enum direction {
  North,
  East,
  South,
  West,
}

export class Creature {
  constructor(x: number, y: number, geneSequences: GeneSequence[], stats: stats) {
    this.moveTo(x, y)
    this.geneSequences = geneSequences
    this.stats = stats
  }

  public x: number = NaN
  public y: number = NaN
  public direction: direction = Math.floor(Math.random() * 4)
  public geneSequences: GeneSequence[]
  public stats: stats

  public moveTo = (x: number, y: number) => {
    this.x = x
    this.y = y
  }

  // public reproduce() {
  //   return new Creature({ x: this.x, y: this.y })
  // }
}
