<template>
  <input
    v-model="model"
    @input="updateValue"
    :placeholder="placeholder"
    class="w-full px-2 py-1 border rounded"
  />
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
});
const emit = defineEmits(["update:modelValue"]);
const model = ref(props.modelValue);

watch(model, (newValue) => {
  emit("update:modelValue", newValue);
});

const updateValue = (event) => {
  model.value = event.target.value;
};
</script>
