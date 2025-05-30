<!-- components/position/PositionForm.vue -->
<template>
  <BaseForm
    title="Permission"
    :model-value="formData"
    @update:model-value="(val) => (formData = val)"
    :is-edit="!!permission?.id"
    :button-text="buttonText"
    @submit="submitForm"
    @back="emit('back', 'table')"
  >
    <template #back-icon>
      <ArrowLeftIcon class="w-6 h-6 text-greneon" />
    </template>

    <BaseInput
      :model-value="formData.name"
      @update:model-value="handleName"
      placeholder="input permission name"
    />
  </BaseForm>
</template>

<script setup>
import BaseForm from "~/components/app/BaseForm.vue";
import BaseInput from "~/components/document/master/BaseInput.vue";

import { ref, watch, defineProps, defineEmits } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";

const props = defineProps({ permission: Object });
const emit = defineEmits(["save", "back"]);
const buttonText = ref("Submit");

let formData = ref({ name: "" });

watch(
  () => props.permission,
  (newVal) => {
    formData.value = newVal ? { ...newVal } : { name: "" };
  },
  { immediate: true }
);

const handleName = (params) => {
  formData.value.name = params;
};
const submitForm = () => {
  emit("save", formData.value);
};
</script>
