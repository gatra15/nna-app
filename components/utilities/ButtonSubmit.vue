<script setup>
import { defineProps } from "vue";

defineProps({
  text: {
    type: String,
    default: "Submit",
  },
});
</script>

<template>
  <div>
    <button
      type="submit"
      class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-greneon rounded-lg focus:ring-4 focus:ring-greneon-200 dark:focus:ring-greneon-200 hover:bg-greneon-200"
    >
      {{ text }}
    </button>
  </div>
</template>
