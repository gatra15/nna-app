<template>
  <div class="bg-matcha flex h-screen">
    <Sidebar />
    <main class="ml-56 flex-1 p-4 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
import Sidebar from "~/components/app/Sidebar.vue";
</script>

<style></style>
