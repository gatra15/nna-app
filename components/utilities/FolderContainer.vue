<template>
  <div class="sm:ml-64" :style="{ paddingTop: navbarHeight + 'px', height: `calc(100vh)` }">
    <!-- Title Navbar -->
    <div class="bg-white dark:bg-gray-800 shadow-sm px-4 py-2 items-center flex justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
        <p class="text-md text-gray-300 dark:text-white">{{ sub_title }}</p>
      </div>
      <slot name="actions"></slot> <!-- Slot for buttons (Add, Export, etc.) -->
    </div>

    <!-- Grid Layout (Left & Right Same Height) -->
    <div class="m-4 grid grid-cols-12 gap-6 p-4 bg-white dark:bg-gray-900">
      <!-- Left Column (File Tree) -->
      <div class="col-span-4 bg-white dark:bg-gray-900 p-4 rounded-lg flex flex-col">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Folders</h2>
        <div class="flex-grow">
          <slot name="tree"></slot> <!-- This content determines the height -->
        </div>
      </div>

      <!-- Right Column (File Table) -->
      <div class="col-span-8 bg-white dark:bg-gray-900 p-4 rounded-lg flex flex-col">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Files</h2>
        <div class="flex-grow overflow-hidden">
          <slot name="table"></slot> <!-- Always stretches to match left -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  sub_title: {
    type: String,
    required: true,
  }
});

// Get Navbar height dynamically
const navbarHeight = ref(0);

onMounted(() => {
  const navbar = document.querySelector("header"); // Assuming navbar is a `header` element
  navbarHeight.value = navbar?.offsetHeight || 64; // Default to 64px if not found
});
</script>

<style scoped>
/* Ensures proper spacing and layout */
.p-4 {
  align-items: stretch;
}
</style>
