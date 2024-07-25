<script setup lang="ts">
import { ref } from 'vue';
import {  RouterView } from 'vue-router'
const isDark = ref(false)

const handleThemeSwitch = ()=>{
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark') 
}



function handleClick(e) {
  // Fallback for browsers that don’t support this API:
  if (!document.startViewTransition) {
    handleThemeSwitch()
    return;
  }

  // Get the click position, or fallback to the middle of the screen
  const x = e?.clientX ?? innerWidth / 2;
  const y = e?.clientY ?? innerHeight / 2;
  // Get the distance to the furthest corner
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  // Create a transition:
  const transition = document.startViewTransition(() => {
    console.log("trigger")
    handleThemeSwitch()

  });

  // Wait for the pseudo-elements to be created:
  transition.ready.then(() => {
    // Animate the root’s new view

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0 at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        direction: isDark.value ? 'reverse' :'normal',
        easing: "ease-in",
        // Specify which pseudo-element to animate
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}





</script>

<template>
  <div class="app-container  dark:bg-gray-900" >
    <header class="text-right container mx-auto  px-12">
      <button @click="handleClick" class="py-2 px-4 border 
      dark:bg-white dark:hover:bg-white/70 dark:active:bg-white/60 dark:text-black
      bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white mt-2">Change {{ isDark }}</button>
    </header>
    <div class="container px-8 py-2 font-sans  mx-auto ">
      <RouterView />
    </div>
  </div>

</template>