<template>
  <div class="bg-matcha flex min-h-screen">
    <Sidebar />
    <main class="flex-1 p-4 overflow-y-auto">
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
