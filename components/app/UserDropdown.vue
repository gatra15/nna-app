<template>
  <div v-if="isHydrated" class="relative flex items-center ms-3">
    <div class="flex justify-between gap-4 text-lempung-100">
      <button
        type="button"
        class="flex text-sm bg-gray-800 rounded-full ring-2 ring-lempung-100 hover:ring-4 hover:ring-lempung"
        @click="toggleDropdown"
      >
        <img
          class="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
      <span class="flex items-center align-middle text-center">
        {{ userStore.user?.name ?? "" }}
      </span>
    </div>

    <div
      v-if="dropdownOpen"
      class="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded shadow-lg transform"
    >
      <div class="px-4 py-3">
        <p class="text-sm text-gray-900">{{ userStore.user?.name ?? "" }}</p>
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ userStore.user?.email ?? "" }}
        </p>
      </div>
      <ul class="py-1">
        <li>
          <button
            @click="changePass"
            class="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-greneon"
          >
            Change Password
          </button>
        </li>
        <li>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-greneon"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { usePasswordStore } from "@/stores/password";
import { useUserStore } from "@/stores/user";
import { useAuthService } from "@/services/AuthService";
import { navigateTo } from "#app";

const dropdownOpen = ref(false);
const isHydrated = ref(false);
const authStore = useAuthStore();
const passwordStore = usePasswordStore();
const userStore = useUserStore();
const authService = useAuthService();

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const handleLogout = () => {
  authService.logout();
  navigateTo("/auth/login");
};

const changePass = () => {
  passwordStore.openChangePassword();
};

onMounted(async () => {
  if (authStore.token) {
    await userStore.loadUser();
  }
  isHydrated.value = true;
});
</script>
