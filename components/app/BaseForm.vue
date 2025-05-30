<!-- components/utilities/BaseForm.vue -->
<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <!-- Back Button -->
    <button
      @click="$emit('back', 'table')"
      class="flex items-center text-greneon gap-2 p-2 border border-greneon rounded-md hover:bg-green-200 mb-5"
    >
      <slot name="back-icon">
        <span>&larr;</span>
      </slot>
      <span>Back</span>
    </button>

    <h2 class="text-lg font-semibold mb-4">
      {{ isEdit ? `Edit ${title}` : `Add ${title}` }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="$emit('submit', modelValue)">
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-10">
        <slot />
      </div>
      <div>
        <slot name="submit-button">
          <ButtonSubmit :text="buttonText" />
        </slot>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ButtonSubmit from "~/components/utilities/ButtonSubmit.vue";

defineProps({
  title: String, // e.g., "Position"
  modelValue: Object,
  buttonText: {
    type: String,
    default: "Submit",
  },
  isEdit: Boolean,
});

defineEmits(["submit", "back", "update:modelValue"]);
</script>
