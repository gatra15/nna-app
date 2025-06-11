<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  modelValue: Array,
  options: Array,
  label: String,
  placeholder: { type: String, default: "Select an option" },
});

const emit = defineEmits(["update:modelValue"]);
const isOpen = ref(false);
const dropdown = ref(null);

const selectedOptions = computed(() =>
  props.options.filter((option) => {
    const value = option.value;

    if (!isNaN(value) && props.modelValue.some((v) => typeof v === "number")) {
      return props.modelValue.includes(parseInt(value, 10));
    }

    return props.modelValue.includes(value);
  })
);

const availableOptions = computed(() =>
  props.options.filter((option) => !props.modelValue.includes(parseInt(option.value, 10)))
);

const isAllSelected = computed(() => {
  return props.options.length > 0 && props.modelValue.length === props.options.length;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  if (!props.modelValue.includes(option.value)) {
    emit("update:modelValue", [...props.modelValue, option.value]);
  }
};

const removeOption = (option) => {
  emit(
    "update:modelValue",
    props.modelValue.filter((value) => value !== option.value)
  );
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emit("update:modelValue", []);
  } else {
    const allIds = props.options.map((option) => option.value);
    emit("update:modelValue", allIds);
  }
};

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
      class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {{ label }}
    </label>

    <div class="relative" ref="dropdown">
      <!-- Selected Items -->
      <div
        class="w-full flex flex-wrap items-center px-3 py-[0.65rem] border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-matcha focus:border-matcha cursor-pointer"
        @click="toggleDropdown"
      >
        <span v-if="selectedOptions.length === 0" class="text-gray-600 text-sm">
          {{ placeholder }}
        </span>

        <div
          v-for="option in selectedOptions"
          :key="option.value"
          class="flex items-center bg-gray-200 dark:bg-gray-700 rounded-md px-2 mr-1"
        >
          <span class="text-xs">{{ option.text }}</span>
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
        v-if="isOpen && props.options.length > 0"
        class="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg"
      >
        <!-- Select All Checkbox -->
        <div
          class="px-2 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex items-center"
        >
          <input
            type="checkbox"
            :checked="isAllSelected"
            @change="toggleSelectAll"
            class="mr-2"
          />
          <span class="text-sm">Select All</span>
        </div>

        <!-- Individual Options -->
        <div
          v-for="option in props.options"
          :key="option.value"
          class="px-2 py-2 flex items-center text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="selectOption(option)"
        >
          <input
            type="checkbox"
            :checked="props.modelValue.includes(option.value)"
            class="mr-2"
            @click.stop
          />
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>
