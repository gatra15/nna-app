<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  options: Array,
  multiple: Boolean,
});

// function
</script>

<template>
  <div class="mb-2">
    <label v-if="label" class="block mb-2 text-xs font-medium text-gray-800 dark:text-white">
      {{ label }}
    </label>
    <input :type="type" :v-model="modelValue" :placeholder="placeholder"
      class="w-full text-sm px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-matcha focus:border-matcha" />
  </div>
</template>
