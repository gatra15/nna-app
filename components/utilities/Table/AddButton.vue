<template>
  <div class="fixed bottom-6 right-6">
    <button @click="emit('openForm')" class=" text-matcha hover:text-white border border-matcha hover:bg-matcha rounded-full shadow-lg transition
      duration-300">
      <PlusCircleIcon class="h-10 w-10" />
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { PlusCircleIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['openForm']);

</script>

<style></style>