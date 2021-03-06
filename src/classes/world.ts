import { Creature } from './creature'

type occupant = Creature

export class World {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    for (let i = 0; i < x; i++) this.world.push(new Array(y))
  }

  public x: number
  public y: number
  public world: (occupant | undefined)[][] = []

  public clearWorld = () => {
    this.world = []
    for (let i = 0; i < this.x; i++) this.world.push(new Array(this.y))
  }
  private hasFreeTiles = () => this.world.find((x) => x.find((y) => y === undefined))
  public isValidTile = (x: number, y: number) => {
    const res = x >= 0 && x < this.x && y >= 0 && y < this.y
    if (res) {
      return true
    } else {
      return res
    }
  }
  public isTileVacant = (x: number, y: number) => {
    return this.world[x][y] === undefined
  }
  public getTileOccupant = (x: number, y: number) => {
    if (!this.isValidTile(x, y)) return undefined
    return this.world[x][y]
  }
  public getRandomVacantTile = () => {
    if (!this.hasFreeTiles) throw new Error('No free tiles.')
    for (let i = 0; i < this.x * this.y * 10; i++) {
      let _x = Math.floor(this.x * Math.random())
      let _y = Math.floor(this.y * Math.random())
      if (this.world[_x][_y] === undefined) return { x: _x, y: _y }
    }
    throw new Error('Could not get random free tile.')
  }
  public removeOccupant = (x: number, y: number) => (this.world[x][y] = undefined)
  public addOccupant = (o: occupant, x: number, y: number) => (this.world[x][y] = o)
}
