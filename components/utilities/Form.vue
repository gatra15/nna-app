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
      {{ className?.id ? "Edit Position" : "Add Position" }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="emit('submitForm')">
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-10">
        <div class="w-full">
          <slot name="form"></slot>
        </div>
      </div>
      <div><ButtonSubmit :text="buttonText" /></div>
    </form>
  </div>
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import ButtonSubmit from "~/components/utilities/ButtonSubmit";

const props = defineProps({
  className: {
    required: true,
  },
  buttonText: {
    required: true,
  },
});
</script>

<style></style>
