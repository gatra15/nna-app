<template>
  <div class="bg-lempung-100 p-4 shadow-md rounded-lg">
    <h3 class="text-md font-semibold">{{ title }}</h3>
    <p class="mt-2 text-xs text-gray-600">{{ desc }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
