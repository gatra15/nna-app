<script setup>
import { defineProps, defineEmits } from "vue";

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

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="mb-4">
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <template v-if="type === 'select'">
      <select
        :value="modelValue"
        @change="updateValue"
        :multiple="multiple"
        class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        :class="{ 'text-gray-400': !modelValue || modelValue.length === 0 }"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </template>
    <template v-else>
      <input
        :type="type"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
        class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
      />
    </template>
  </div>
</template>
