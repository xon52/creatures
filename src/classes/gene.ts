import { actionCallback, processCallback, geneSignal, sensorCallback } from '../types'
import { Creature, World } from '.'

export enum GeneType {
  sensor,
  action,
  process,
}

export class GeneAction {
  constructor(name: string, callback: actionCallback) {
    this.name = name
    this.callback = callback
  }
  public type = GeneType.action
  public name
  public callback
  public run = (creature: Creature, world: World, input: geneSignal) => this.callback(creature, world, input)
}

export class GeneProcess {
  constructor(name: string, callback: processCallback) {
    this.name = name
    this.callback = callback
  }
  public type = GeneType.process
  public name
  public callback
  public run = (creature: Creature, world: World, input: geneSignal) => this.callback(creature, world, input)
}

export class GeneSensor {
  constructor(name: string, callback: sensorCallback) {
    this.name = name
    this.callback = callback
  }
  public type = GeneType.sensor
  public name
  public callback
  public run = (creature: Creature, world: World) => this.callback(creature, world)
}

export type Gene = GeneAction | GeneProcess | GeneSensor
