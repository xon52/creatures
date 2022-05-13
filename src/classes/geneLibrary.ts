import { randomBinary } from '../helpers'
import { gene } from '../types'

export class GeneLibrary {
  constructor(genes: gene[], geneLength: number) {
    if (2 ** geneLength < genes.length) throw new Error('Gene Library gene length is not enough for given genes.')
    this.geneLength = geneLength
    this.fillLibrary(genes)
  }

  private geneLength: number
  public all: Record<string, gene> = {}

  private fillLibrary = (genes: gene[]) => {
    const maxGenes = 2 ** this.geneLength
    genes.forEach((gene) => {
      for (let i = 0; i < maxGenes * 10; i++) {
        const geneKey = randomBinary(this.geneLength)
        if (this.all[geneKey] === undefined) return (this.all[geneKey] = gene)
      }
      throw new Error(`Gene Library failed to find a key for a gene.`)
    })
  }

  public extract = (genome: string) => {
    const chunks = genome.match(new RegExp(`.{1,${this.geneLength}}`, 'g'))
    if (!chunks) throw new Error(`Genome cannot be empty in a search.`)
    const genes = chunks.filter((gene) => gene.length === this.geneLength)
    return genes.map((gene) => this.all[gene])
  }

  public find = (gene: string) => this.all[gene]
}
