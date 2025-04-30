<template>
  <div class="mb-2">
    <label v-if="label" class="block mb-2 text-xs font-medium text-gray-800 ">
      {{ label }}
    </label>
    <input id="date" type="date" :value="modelValue" :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      class="w-full text-sm rounded-lg border-gray-300 shadow-sm focus:border-matcha focus:ring focus:ring-matcha focus:ring-opacity-50" />
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
  placeholder: {
    type: String,
    required: false,
  }
})
</script>

<style></style>