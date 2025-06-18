<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Change Password</h2>
        <form @submit.prevent="submitChangePassword">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              v-model="newPassword"
              class="w-full px-3 py-2 border focus:ring-matcha focus:border-matcha rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              v-model="confirmPassword"
              class="w-full px-3 py-2 border focus:ring-matcha focus:border-matcha rounded"
              required
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              @click="close"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-matcha text-white rounded hover:bg-matcha"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePasswordStore } from "@/stores/password";
import { useAuthService } from "@/services/AuthService";
import Swal from "sweetalert2";

const passwordStore = usePasswordStore();
const authService = useAuthService();

const newPassword = ref("");
const confirmPassword = ref("");

const isVisible = computed(() => passwordStore.changePasswordVisible);

const close = () => {
  passwordStore.closeChangePassword();
  newPassword.value = "";
  confirmPassword.value = "";
};

const submitChangePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    Swal.fire({
      icon: "error",
      title: "Mismatch",
      text: "Password confirmation does not match!",
    });
    return;
  }

  Swal.fire({
    title: "Changing Password...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    await authService.changePassword({
      password: newPassword.value,
      password_confirmation: confirmPassword.value,
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Password changed successfully!",
    });

    close();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error?.response?._data?.message || "Failed to change password.",
    });
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
