import { Creature, Gene, World } from '.'
import { GeneAction, GeneProcess, GeneSensor, GeneType } from './gene'

export class GeneSequence {
  constructor(creature: Creature, genes: Gene[]) {
    this.creature = creature
    genes.forEach((gene) => {
      if (gene.type === GeneType.action) this.actions.push(gene as GeneAction)
      else if (gene.type === GeneType.process) this.processes.push(gene as GeneProcess)
      else if (gene.type === GeneType.sensor) this.sensors.push(gene as GeneSensor)
      else throw new Error(`Unknown gene type "${gene.type}" in sequence.`)
    })
  }

  private creature: Creature
  private actions: GeneAction[] = []
  private processes: GeneProcess[] = []
  private sensors: GeneSensor[] = []

  public run = (world: World) => {
    const sensorOutput = this.sensors.length ? this.sensors[0].run(this.creature, world) : false
    const processOutput = this.processes.length ? this.processes[0].run(this.creature, world, sensorOutput) : false
    const actionOutput = this.actions.length ? this.actions[0].run(this.creature, world, processOutput) : undefined
  }
}
