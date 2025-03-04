<template>
  <div
    class="absolute inset-x-0 bg-gray-800 bg-opacity-30 flex flex-col items-center justify-center z-50"
    :style="{ top: navbarHeight + 'px', height: `calc(100vh - ${navbarHeight}px)` }"
  >
    <!-- Gradient Circle Animation -->
    <div class="relative flex space-x-2">
      <div
        class="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-bounce"
      ></div>
      <div
        class="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-bounce [animation-delay:0.2s]"
      ></div>
      <div
        class="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-bounce [animation-delay:0.4s]"
      ></div>
    </div>

    <!-- Shimmer Text Effect -->
    <p class="mt-4 text-lg font-semibold text-white animate-pulse">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const navbarHeight = ref(64);

onMounted(() => {
  const navbar = document.querySelector("header");
  navbarHeight.value = navbar?.offsetHeight || 64;
});
</script>

<style scoped></style>
