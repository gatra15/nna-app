<template>
  <div class="p-6 bg-white rounded-lg shadow-md" v-if="state === 'form'">
    <button @click=" emit('back', 'table')"
      class="flex items-center text-matcha gap-2 p-2 border border-matcha rounded-md hover:bg-matcha hover:text-lempung-100 mb-5 group">
      <ArrowLeftIcon class="w-6 h-6 text-matcha group-hover:text-lempung-100" />
      <span>Back</span>
    </button>
    <h2 class="text-lg font-semibold mb-4">
      {{ className?.id ? "Edit " + menu : "Add " + menu }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="emit('submitForm')">
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-10">
        <div class="w-full">
          <slot name="form"></slot>
        </div>
      </div>
      <div>
        <ButtonSubmit :text="buttonText" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import ButtonSubmit from "~/components/utilities/ButtonSubmit";

const emit = defineEmits(['back', 'submitForm'])
const props = defineProps({
  buttonText: {
    required: true,
  },
  className: Number,
  isOpen: Boolean,
  menu: String,
  state: String,
});

watch(() => props.state, (val) => {
  console.log("form: ", props.state)
})

onMounted(() => {
  console.log('test')
})
</script>

<style></style>
