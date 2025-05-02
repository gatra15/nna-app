<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-1/3">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">{{ modalTitle }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">X</button>
      </div>

      <div>
        <label for="name" class="block text-sm font-semibold text-gray-800 mb-2">Name</label>
        <input type="hidden" name="id" :value="form.id" @input="onChangeId">
        <Input :model-value="form.name" @update:model-value="onChangeName" :name="name" placeholder="Enter name" />
      </div>

      <!-- Save Button -->
      <div class="mt-6 flex justify-end">
        <button @click="submitForm" class="bg-matcha text-white px-4 py-2 rounded-lg hover:bg-matcha">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import Input from '~/components/utilities/Form/Input.vue';

const emit = defineEmits(['closeModal'])
const form = ref({
  id: null,
  name: ''
}); // Form data

const modalTitle = ref('');

// Props from parent to pass data into the modal
const props = defineProps({
  initialData: Object,
  isCategory: Boolean,
  isOpen: Boolean,
});

// Watch for changes in initial data
watch(() => props.initialData, (newValue) => {
  onChangeName(newValue.name)
  onChangeId(newValue.id)
  modalTitle.value = props.isCategory ? 'Edit Category' : 'Edit Document Type';
});

// Close the modal
const closeModal = () => {
  emit('closeModal')
};

const onChangeName = (val) => {
  form.value.name = val
}

const onChangeId = (val) => {
  form.value.id = val
}

const submitForm = () => {
  emit('submit', form.value);
  closeModal(); // Close modal after submit
};

</script>

<style scoped>
/* Modal Styling */
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

button {
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
