<!-- components/form/CheckboxItem.vue -->
<template>
  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      :id="id"
      :value="value"
      :checked="modelValue.includes(value)"
      @change="handleChange"
      class="accent-matcha"
    />
    <label :for="id" class="text-sm text-gray-700">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  label: String,
  value: [String, Number],
  modelValue: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

function handleChange(event) {
  const checked = event.target.checked;
  const newValue = [...props.modelValue];
  if (checked && !newValue.includes(props.value)) {
    newValue.push(props.value);
  } else if (!checked) {
    const index = newValue.indexOf(props.value);
    if (index > -1) newValue.splice(index, 1);
  }
  emit("update:modelValue", newValue);
}
</script>
