<template>
  <div class="relative flex items-center ms-3">
    <!-- User Profile Button -->
    <div>
      <button
        type="button"
        class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        @click="toggleDropdown"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
    </div>

    <!-- Dropdown Menu Positioned Below the Image -->
    <div
      v-if="dropdownOpen"
      class="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded shadow-lg dark:bg-gray-700 dark:border-gray-600 transform"
    >
      <div class="px-4 py-3">
        <p class="text-sm text-gray-900 dark:text-white">{{ "Administrator" }}</p>
        <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
          {{ "administrator@email.com" }}
        </p>
      </div>
      <ul class="py-1">
        <li>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-greneon dark:text-gray-300 dark:hover:bg-greneon dark:hover:text-gray-100"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthService } from "@/services/AuthService";
import { navigateTo } from "#app";
import { useUserStore } from "@/stores/user";

const dropdownOpen = ref(false);
const authService = useAuthService();
const userStore = useUserStore();

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const handleLogout = () => {
  authService.logout();
  navigateTo("/auth/login");
};
</script>
