<template>
  <div class="container w-full max-w-full bg-white rounded-lg shadow-lg h-full p-4">
    <LoadingScreen v-if="isLoading" class="absolute ml-56 inset-0 z-50" />
    <div
      class="bg-matcha rounded-sm shadow-xl px-4 py-2 items-center flex justify-between"
    >
      <div>
        <h1 class="text-sm font-bold text-lempung-100">
          {{ title }}
        </h1>
        <p class="text-xs text-lempung">{{ sub_title }}</p>
      </div>
      <slot name="actions"></slot>
    </div>

    <div class="bg-white rounded-lg mt-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import LoadingScreen from "~/components/utilities/LoadingScreen.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  sub_title: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const navbarHeight = ref(0);

onMounted(() => {
  const navbar = document.querySelector("header");
  navbarHeight.value = navbar?.offsetHeight || 64;
});
</script>

<style scoped>
.p-4 {
  align-items: stretch;
}
</style>
