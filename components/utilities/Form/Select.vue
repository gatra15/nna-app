<template>
  <div class="mb-2">
    <label v-if="label" class="block mb-2 text-xs font-medium text-gray-800 ">
      {{ label }}
    </label>
    <select :value="modelValue" :multiple="multiple" @change="emit('update:modelValue', $event.target.value)"
      class="w-full px-3 py-3 border border-gray-300 text-xs rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-matcha focus:border-matcha"
      :class="{ 'text-gray-800': !modelValue || modelValue.length === 0 }">
      <option class="text-gray-400 text-xs" v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option class="text-gray-400 text-xs" v-for="val in options" :key="val.id" :value="val.id">
        {{ val.text }}
      </option>
    </select>
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
  multiple: {
    type: Boolean,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
  }
})
</script>

<style></style>