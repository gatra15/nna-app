<template>
  <aside id="logo-sidebar" class="w-56 h-screen bg-matcha fixed top-0 left-0 p-4 flex flex-col">
    <!-- Logo Section -->
    <div class="flex items-center justify-center gap-2 mb-6 px-3">
      <img :src="logo" class="h-12 w-12 rounded-full transition-transform duration-300 transform hover:scale-110"
        alt="Logo" />
      <span class="text-xl font-semibold tracking-widest text-white">NDC</span>
    </div>

    <!-- Menu Section -->
    <div class="flex-grow px-3 pb-4 overflow-y-auto">
      <ul class="text-xs text-white">
        <SidebarItem v-for="item in sidebarStore.menuItems" :key="item.text" :item="item" :router="router" :level="0" />
      </ul>
    </div>

    <!-- User Dropdown -->
    <div class="mt-auto p-2 rounded-lg">
      <UserDropdown />
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar";
import SidebarItem from "~/components/utilities/SidebarItem.vue";
import UserDropdown from "~/components/app/UserDropdown.vue";
import logo from '~/assets/images/nna.png'; // Mengimpor logo yang digunakan di halaman login

const sidebarStore = useSidebarStore();
const router = useRouter();
</script>

<style scoped>
/* Styling tambahan jika diperlukan */
</style>
