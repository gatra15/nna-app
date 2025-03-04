<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center justify-between px-4 py-3 lg:px-6">
      <!-- Kiri: Logo + Sidebar Toggle -->
      <div class="flex items-center gap-3">
        <button
          @click="sidebarStore.toggleCollapse"
          class="flex items-center justify-center w-full text-gray-900 rounded-lg dark:text-white"
        >
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Logo" />
          <span class="ml-2 text-xl font-semibold dark:text-white">NNA</span>
        </button>
      </div>

      <!-- Kanan: Dark Mode Toggle + User Dropdown -->
      <div class="flex items-center gap-4">
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <MoonIcon v-if="isDark" class="w-6 h-6 text-white" />
          <SunIcon v-else class="w-6 h-6 text-gray-800" />
        </button>

        <UserDropdown />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import UserDropdown from "~/components/app/UserDropdown.vue";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
import { useSidebarStore } from "~/stores/sidebar";

const isDark = ref(false);
const sidebarStore = useSidebarStore();

// Eksekusi hanya setelah komponen dimuat di browser
onMounted(() => {
  isDark.value = localStorage.getItem("theme") === "dark";
  document.documentElement.classList.toggle("dark", isDark.value);
});

// Perbarui localStorage setiap kali tema berubah
watch(isDark, (newValue) => {
  localStorage.setItem("theme", newValue ? "dark" : "light");
  document.documentElement.classList.toggle("dark", newValue);
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
};
</script>
