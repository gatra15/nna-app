<template>
  <div
    class="sm:ml-64 relative"
    :style="{ paddingTop: navbarHeight + 'px', height: `calc(100vh)` }"
  >
    <LoadingScreen v-if="isLoading" class="absolute inset-0 z-50" />
    <!-- Title Navbar -->
    <div
      class="bg-white dark:bg-gray-800 shadow-sm px-4 py-2 items-center flex justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-200">{{ title }}</h1>
        <p class="text-md text-gray-300 dark:text-gray-300">{{ sub_title }}</p>
      </div>
      <slot name="actions"></slot>
      <!-- Slot for buttons (Add, Export, etc.) -->
    </div>

    <div class="m-4 p-4 bg-white rounded-lg dark:bg-gray-900">
      <slot name="content"></slot>
      <!-- CRUD Table Content -->
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
