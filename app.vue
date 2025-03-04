<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthService } from "@/services/AuthService";

const authService = useAuthService();

onMounted(() => {
  authService.checkUserSession();
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  font-family: "Inter", sans-serif;
}
</style>
