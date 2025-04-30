<template>
  <div class="mb-2">
    <label v-if="label" class="block mb-2 text-xs font-medium text-gray-800 dark:text-white">
      {{ label }}
    </label>
    <input type="text" :name="name" :value="modelValue" :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      class="w-full text-sm px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-matcha focus:border-matcha" />
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
  },
  name: {
    type: String,
  },
  placeholder: {
    type: String,
  }
})
</script>

<style></style>