<template>
  <nav class="fixed top-0 z-50 left-56 w-[calc(100%-224px)] bg-matcha">
    <div class="flex items-center justify-between px-4 py-3 lg:px-6">
      <!-- Kiri kosong agar navbar tetap terpotong sidebar tanpa ganggu elemen kanan -->
      <div class="flex-1" />

      <!-- Kanan: Dark Mode Toggle + User Dropdown -->
      <div class="flex items-center gap-4">
        <!-- <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          <MoonIcon v-if="isDark" class="w-6 h-6 text-white" />
          <SunIcon v-else class="w-6 h-6 text-gray-800" />
        </button> -->

        <!-- User Dropdown (Profile) -->
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
