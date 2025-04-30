<template>
  <aside
    id="logo-sidebar"
    class="w-56 h-screen bg-matcha fixed top-0 left-0 p-4 flex flex-col"
  >
    <!-- Logo Section -->
    <div class="flex items-center justify-center gap-2 mb-6 px-3">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="h-8"
        alt="Logo"
      />
      <span class="text-lg font-semibold text-white">NNA</span>
    </div>

    <!-- Menu Section -->
    <div class="flex-grow px-3 pb-4 overflow-y-auto">
      <ul class="text-xs text-white">
        <SidebarItem
          v-for="item in sidebarStore.menuItems"
          :key="item.text"
          :item="item"
          :router="router"
          :level="0"
        />
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

const sidebarStore = useSidebarStore();
const router = useRouter();
</script>
