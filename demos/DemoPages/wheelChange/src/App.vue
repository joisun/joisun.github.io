<script setup lang="ts">
import { onMounted, ref } from 'vue';
import knife_map from './components/knife_map.vue';
const svgContainer = ref<InstanceType<typeof knife_map> | null>(null)
const canvas = ref<HTMLDivElement | null>(null)
let translateXY = ref([0, 0]);
let scale = ref(1)
const minMax = [0.5, 1.5]
onMounted(() => {
  const { width: cvs_width, height: cvs_height } = canvas.value!.getBoundingClientRect()
  const { width, height }: { [x: string]: number } = svgContainer.value?.$el.getBoundingClientRect()
  translateXY.value = [(cvs_width - width) / 2, (cvs_height - height) / 2]
})

const mouseMoveEventHandler = (e: MouseEvent) => {
  translateXY.value[0] += e.movementX
  translateXY.value[1] += e.movementY
}
const handleMouseDown = () => {
  canvas.value?.addEventListener("mousemove", mouseMoveEventHandler)
}
const handleMouseUp = () => {
  canvas.value?.removeEventListener("mousemove", mouseMoveEventHandler)
}
const handleWheelEvent = (e: any) => {
  const wheelDelta = e.wheelDelta as number
  if(scale.value > minMax[1] || scale.value < minMax[0]) return;
  const targetScaleValue = scale.value + wheelDelta / 120 * 0.1
  scale.value = Math.max(minMax[0],Math.min(targetScaleValue,minMax[1]))
}
</script>

<template>
  <div class="root">
    <div class="canvas" ref="canvas" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @wheel="handleWheelEvent" @mouseout="handleMouseUp">
      <knife_map ref="svgContainer" class="knife_map" @mousedown.stop
        :style="{ transform: `translate(${translateXY[0]}px,${translateXY[1]}px) scale(${scale})` }"></knife_map>
    </div>
  </div>
</template>

<style scoped>
.root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvas {
  width: 80%;
  height: 80%;
  border: 1px solid rgb(87, 87, 87);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.knife_map {
  position: absolute;
  cursor: default;
  transform-origin: center center;
}
</style>
