<!-- components/position/PositionForm.vue -->
<template>
  <BaseForm
    title="Position"
    :model-value="formData"
    @update:model-value="(val) => (formData = val)"
    :is-edit="!!position?.id"
    :button-text="buttonText"
    @submit="submitForm"
    @back="emit('back', 'table')"
  >
    <template #back-icon>
      <ArrowLeftIcon class="w-6 h-6 text-greneon" />
    </template>

    <BaseInput
      v-model="formData.name"
      type="text"
      label="position Name"
      placeholder="Enter position name"
    />
  </BaseForm>
</template>

<script setup>
import BaseForm from "~/components/app/BaseForm.vue";
import BaseInput from "~/components/document/master/BaseInput.vue";

import { ref, watch, defineProps, defineEmits } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";

const props = defineProps({ position: Object });
const emit = defineEmits(["save", "back"]);

let formData = ref({ name: "" });

watch(
  () => props.position,
  (newVal) => {
    formData.value = newVal ? { ...newVal } : { name: "" };
  },
  { immediate: true }
);

const buttonText = ref("Submit");

const submitForm = () => {
  emit("save", formData.value);
};
</script>
