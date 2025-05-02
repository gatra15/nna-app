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
    <button type="submit"
      class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-matcha rounded-lg focus:ring-4 hover:ring-lempung-100 hover:bg-matcha">
      {{ text }}
    </button>
  </div>
</template>
