<template>
  <div class="max-w-sm p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-md">
    <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-800">
      {{ title }}
    </h5>
    <p class="mb-4 font-normal text-gray-700">{{ description }}</p>
    <button
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      @click="onClick">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: "Learn More",
  },
  onClick: {
    type: Function,
    default: () => { },
  },
});
</script>
