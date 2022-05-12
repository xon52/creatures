import { Creature } from './creature'

type occupant = Creature

export class World {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    for (let i = 0; i < x; i++) this.world.push(new Array(y))
  }

  private x: number
  private y: number
  public world: (occupant | undefined)[][] = []

  private hasFreeTiles = () => this.world.find((x) => x.find((y) => y === undefined))
  public isValidTile = (x: number, y: number) => x > 0 && x <= this.x && y > 0 && y <= this.y
  public isTileVacant = (x: number, y: number) => this.world[x][y] === undefined
  public getTileOccupant = (x: number, y: number) => this.world[x][y]
  public getRandomFreeTile = () => {
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
