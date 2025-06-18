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
import Swal from "sweetalert2";

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
  } catch ({ response }) {
    loading.value = false;
    handleError(response.data.message);
  } finally {
    loading.value = false;
  }
}

function handleError(message) {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  }).then(function (isConfirm) {
    if (isConfirm) {
      loading.value = false;
    }
  });
}

useHead({
  title: "Login",
});
</script>

<style></style>
