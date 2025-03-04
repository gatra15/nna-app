<template>
  <div class="bg-gray-100 dark:bg-gray-700">
    <Navbar />
    <Sidebar />
    <!-- Content -->
    <main class="">
      <slot />
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth"
})
import Navbar from "~/components/app/Navbar.vue";
import Sidebar from "~/components/app/Sidebar.vue";
</script>

<style></style>