<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <SidebarItem
          v-for="item in sidebarStore.menuItems"
          :key="item.text"
          :item="item"
          :router="router"
          :level="0"
        />
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar";
import SidebarItem from "~/components/utilities/SidebarItem.vue";

const sidebarStore = useSidebarStore();
const router = useRouter();
</script>
