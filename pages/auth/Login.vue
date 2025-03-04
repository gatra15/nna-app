<template>
  <div>
    <AuthCard>
      <AuthForm
        @submit="handleLogin"
        :errorMessage="errorMessage"
        :loading="loading"
      ></AuthForm>
    </AuthCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthService } from "@/services/AuthService";
import AuthCard from "~/components/auth/AuthCard.vue";
import AuthForm from "~/components/auth/AuthForm.vue";

definePageMeta({
  layout: "auth",
});

const authService = useAuthService();
const errorMessage = ref("");
const loading = ref(false);

async function handleLogin(credentials) {
  try {
    loading.value = true;
    errorMessage.value = "";

    await authService.login(credentials);
  } catch (error) {
    errorMessage.value = "Invalid username or password";
  } finally {
    loading.value = false;
  }
}

useHead({
  title: "Login",
});
</script>

<style></style>
