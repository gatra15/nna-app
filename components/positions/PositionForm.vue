<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import BaseInput from "~/components/utilities/BaseInput";
import ButtonSubmit from "~/components/utilities/ButtonSubmit";

const props = defineProps({ position: Object });
const emit = defineEmits(["save", "back"]);

const formData = ref({
  name: "",
});

watch(
  () => props.position,
  (newValue) => {
    formData.value = newValue
      ? { ...newValue }
      : {
          name: "",
        };
  },
  { immediate: true }
);

const submitForm = () => {
  emit("save", formData.value);
};

const buttonText = ref("Submit");
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <button
      @click="emit('back', 'table')"
      class="flex items-center text-greneon gap-2 p-2 border border-greneon rounded-md hover:bg-green-200 mb-5"
    >
      <ArrowLeftIcon class="w-6 h-6 text-greneon" />
      <span>Back</span>
    </button>
    <h2 class="text-lg font-semibold mb-4">
      {{ position?.id ? "Edit Position" : "Add Position" }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-10">
        <div class="w-full">
          <BaseInput
            v-model="formData.name"
            type="text"
            label="Position Name"
            placeholder="Enter position name"
          />
        </div>
      </div>
      <div><ButtonSubmit :text="buttonText" /></div>
    </form>
  </div>
</template>
