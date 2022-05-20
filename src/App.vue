<template>
  <div class="wrapper">
    <canvas ref="world" :width="config.worldX * zoom" :height="config.worldY * zoom"></canvas>
    <div>
      <button @click="run">Run</button>
      <button @click="step">Step</button>
      <button @click="stop">Stop</button>
      <span class="info">Gen: {{ currGen }}</span>
      <span class="info">Step: {{ currStep }}</span>
    </div>
    <span class="info">Genes:</span>
    <p v-for="gene in geneHistory.sort()">
      <span v-for="key in Object.keys(gene).sort()">{{ key }}: {{ gene[key] }} | </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import { Simulation } from './classes/simulation'

const config = {
  mutationChance: 0.001,
  worldX: 200,
  worldY: 200,
  creatureCount: 400,
  steps: 200,
  generations: 50,
  geneLength: 6,
  genomeLength: 100,
}
const stepTime = 5
const zoom = 4
const simulation = new Simulation(config)

let world: Ref<HTMLCanvasElement | undefined> = ref()
const isStopped = ref(false)
const currGen = ref(0)
const currStep = ref(0)
const geneHistory: Ref<Record<string, number>[]> = ref([])

const stop = () => (isStopped.value = true)
const step = () => {
  simulation.step()
  draw()
}
const run = async () => {
  for (currGen.value = 0; currGen.value < config.generations; currGen.value++) {
    geneHistory.value.push({})
    simulation.creatures.forEach((c) =>
      c.genes.forEach((g) => {
        if (g === undefined) return
        let _length = geneHistory.value.length - 1
        geneHistory.value[_length][g.name] = geneHistory.value[_length][g.name] + 1 || 1
      })
    )
    for (currStep.value = 0; currStep.value < config.steps; currStep.value++) {
      if (isStopped.value) {
        console.log(simulation.creatures)
        isStopped.value = false
        return
      }
      simulation.step()
      draw()
      await new Promise((resolve) => setTimeout(resolve, stepTime))
    }
    simulation.filter1()
  }
}

const draw = () => {
  const ctx = world.value?.getContext('2d')
  ctx?.clearRect(0, 0, config.worldX * zoom, config.worldY * zoom)
  simulation.creatures.forEach((c) => {
    if (ctx) {
      ctx.fillStyle = c.color
      ctx.fillRect(c.x * zoom, c.y * zoom, zoom, zoom)
    }
  })
}
onMounted(() => draw())
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid #eee;
  width: 800px;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.info {
  padding: 5px;
  margin: 5px 10px;
}
</style>
