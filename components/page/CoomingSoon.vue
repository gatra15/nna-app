<template>
  <div
    class="relative flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center sm:ml-64"
    :style="{ paddingTop: navbarHeight + 'px', height: `calc(100vh)` }"
  >
    <!-- Logo Watermark -->
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      alt="Logo Watermark"
      class="absolute opacity-10 w-1/2 md:w-1/3 lg:w-1/4"
    />

    <!-- Content -->
    <div class="relative z-10 px-6 max-w-3xl">
      <h1
        class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fade-in"
      >
        🚀 Coming <span class="text-blue-500">Soon</span>
      </h1>
      <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">
        We are working on something amazing. Stay tuned!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const navbarHeight = ref(64); // Default 64px

onMounted(() => {
  const navbar = document.querySelector("nav"); // Ambil tinggi navbar utama
  navbarHeight.value = navbar?.offsetHeight || 64;
});
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
