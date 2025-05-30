<template>
  <div class="space-y-2">
    <label class="block font-semibold mb-2">Permissions:</label>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <CheckboxItem v-for="permission in permissions" :key="permission.id" :id="`perm-${permission.id}`"
        :label="permission.name" :value="permission.id" v-model="modelValue" />
    </div>
  </div>
</template>

<script setup>
import CheckboxItem from '~/components/utilities/Form/CheckBox.vue';

defineProps({
  permissions: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
  },
});
defineEmits(["update:modelValue"]);
</script>
