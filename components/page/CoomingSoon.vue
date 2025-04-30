<template>
  <div
    class="flex flex-col items-center justify-center align-middle bg-gray-50"
    style="height: calc(100vh - 140px)"
  >
    <!-- Logo Watermark -->
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      alt="Logo Watermark"
      class="absolute opacity-10 w-1/2 md:w-1/3 lg:w-1/4"
    />

    <!-- Content -->
    <div class="z-10 px-6">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in">
        🚀 Coming <span class="text-blue-500">Soon</span>
      </h1>
      <p class="mt-3 text-lg text-gray-600">
        We are working on something amazing. Stay tuned!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {});
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.5s ease-in-out;
}
</style>
