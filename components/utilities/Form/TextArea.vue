<template>
  <div class="mb-2">
    <label v-if="label" class="block mb-2 text-xs font-medium text-gray-800 ">
      {{ label }}
    </label>
    <textarea id="message" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" rows="4"
      class="w-full text-sm h-[108px] rounded-lg border-gray-300 shadow-sm focus:border-matcha focus:ring focus:ring-matcha focus:ring-opacity-50"
      placeholder="Write your message here..."></textarea>

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