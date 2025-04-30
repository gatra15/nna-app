<template>
  <!-- Modal Background -->
  <div v-if="isModalOpen" class="fixed ml-56 inset-0 bg-matcha bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white w-4/5 lg:w-3/4 xl:w-2/3 rounded-lg shadow-lg p-6">

      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-md font-semibold text-gray-900">Upload Document</h3>
        <button @click="emit('closeModal')" class="text-gray-500 hover:text-gray-800">
          <span class="material-icons text-xs">
            <XCircleIcon class="w-5 h-5 text-matcha text-center" />
          </span>
        </button>
      </div>

      <!-- Modal Body with Form -->
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          <div class="flex flex-col space-y-4">
            <slot name="left"></slot>
          </div>

          <div class="flex flex-col space-y-4">
            <slot name="right"></slot>
          </div>
        </div>
        <div class="flex flex-col space-y-4 lg:col-span-2">
          <slot name="combined"></slot>
        </div>

        <!-- Submit Button -->
        <div class="mt-6 flex justify-end">
          <button type="submit" class="px-4 py-2 bg-matcha text-sm text-white rounded-md hover:bg-matcha"
            :disabled="isUploading">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { XCircleIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(['closeModal', 'submit'])

// Submit form
const submitForm = () => {
  emit('submit');
};
</script>

<style scoped></style>
