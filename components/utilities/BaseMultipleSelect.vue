<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  modelValue: Array, // Array berisi opsi yang sudah dipilih
  options: Array, // Semua opsi yang tersedia dari API
  label: String,
  placeholder: { type: String, default: "Select an option" },
});

const emit = defineEmits(["update:modelValue"]);
const isOpen = ref(false);
const dropdown = ref(null);

// **Gunakan computed agar tetap reaktif tanpa perlu mutasi langsung**
const selectedOptions = computed(() =>
  props.options.filter((option) => props.modelValue.includes(option.value))
);

const availableOptions = computed(() =>
  props.options.filter((option) => !props.modelValue.includes(option.value))
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// **Tambahkan opsi yang dipilih ke modelValue**
const selectOption = (option) => {
  if (!props.modelValue.includes(option.value)) {
    emit("update:modelValue", [...props.modelValue, option.value]);
  }
};

// **Hapus opsi dari modelValue**
const removeOption = (option) => {
  emit(
    "update:modelValue",
    props.modelValue.filter((value) => value !== option.value)
  );
};

// **Tutup dropdown jika klik di luar area**
const closeDropdown = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {{ label }}
    </label>

    <div class="relative" ref="dropdown">
      <!-- Selected Items -->
      <div
        class="w-full flex flex-wrap items-center px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500 cursor-pointer"
        @click="toggleDropdown"
      >
        <span v-if="selectedOptions.length === 0" class="text-gray-400">
          {{ placeholder }}
        </span>

        <div
          v-for="option in selectedOptions"
          :key="option.value"
          class="flex items-center bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 mr-1 mb-1"
        >
          <span class="text-sm">{{ option.name }}</span>
          <button
            @click.stop="removeOption(option)"
            class="ml-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Dropdown Options -->
      <div
        v-if="isOpen && availableOptions.length > 0"
        class="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg"
      >
        <div
          v-for="option in availableOptions"
          :key="option.value"
          @click="selectOption(option)"
          class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>
