<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router  = useRouter()
const randomName = (l: number = 12) => {
  const base = "asdf ghjk lqwe rtyu iopz xcvb nm"
  let result = ''
  for (let i = 0; i < l; i++) {
    result += base.charAt(Math.random() * base.length)
  }
  const _r = result.split('')
  _r[0] = _r[0].toLocaleUpperCase()
  return _r.join('')
}

const jump = async (i:number)=>{
  await router.push(`/detail/${i + 1}`)
}


async function spaNavigate(data:number,e) {
  // Fallback for browsers that don’t support this API:
  if (!document.startViewTransition) {
    await jump(data)
    return;
  }

  // Get the click position, or fallback to the middle of the screen
  console.log( e?.clientX)
  const x = e?.clientX ?? innerWidth / 2;
  const y = e?.clientY ?? innerHeight / 2;
  // Get the distance to the furthest corner
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  // Create a transition:
  const transition = document.startViewTransition(() => {
    jump(data)

  });


}



const handleClick = async (i:number,e:Event)=>{
  const target = e.target as HTMLImageElement
  (target.style as any).viewTransitionName = 'dog-card'
     document.startViewTransition(async () => {
      // router.push(`/detail/${i + 1}`)
      await spaNavigate(i,e)
    })
}

</script>

<template>
  <main>
    <h1 class="font-bold text-3xl dark:text-white">Easybuy</h1>
      <h2 class="text-xl mt-2 text-gray-400 dark:text-white/80">Rerum officia hic qui ipsam eveniet non reiciendis.</h2>
      <div class="item-list mt-12 grid grid-cols-4 gap-y-4 gap-x-2">
        <div class="item " v-for="(image, index) in 16" :key="index" >
            <img @click="e=>handleClick(index,e)" class="aspect-square w-full  cursor-pointer hover:border-gray-200 border border-transparent p-1" :src="`https://placedog.net/50/50?id=${index + 1}`" :alt="`Image ${index + 1}`">
          <p class="name font-semibold dark:text-gray-200"> {{ randomName(8) }}</p>
          <p class="text-gray-500">{{ randomName(12) }}.</p>
          <p class="text-right font-semibold text-gray-700 text-sm">$99.00</p>
        </div>
      </div>
  </main>
</template>