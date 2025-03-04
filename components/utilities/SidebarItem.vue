<template>
  <li>
    <!-- Parent Menu -->
    <button
      @click="
        item.children
          ? toggleDropdown(item.text)
          : sidebarStore.navigateTo(item.route, router)
      "
      class="flex items-center justify-between w-full p-3 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      :class="{
        'font-bold': item.children || item.text === 'Dashboard',
        'font-normal': !item.children && item.text !== 'Dashboard',
      }"
    >
      <span class="flex items-center gap-2">
        <component
          :is="icons[item.icon]"
          class="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
        <span>{{ item.text }}</span>
      </span>
      <ChevronDownIcon
        v-if="item.children"
        :class="{ 'rotate-180': openDropdowns.has(item.text) }"
        class="w-5 h-5 transition-transform"
      />
    </button>

    <!-- Child Items -->
    <ul v-show="openDropdowns.has(item.text)" class="py-1 space-y-1">
      <SidebarItem
        v-for="child in item.children"
        :key="child.text"
        :item="child"
        :router="router"
        :level="level + 1"
        class="ml-8"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { icons } from "@/composables/icons.js";
import { useSidebarStore } from "@/stores/sidebar";

const props = defineProps({
  item: Object,
  router: Object,
  level: {
    type: Number,
    default: 0, // Default level 0 untuk parent
  },
});

const sidebarStore = useSidebarStore();
const openDropdowns = ref(new Set());

// Fungsi Toggle Dropdown Menu
const toggleDropdown = (menu) => {
  if (openDropdowns.value.has(menu)) {
    openDropdowns.value.delete(menu);
  } else {
    openDropdowns.value.add(menu);
  }
  openDropdowns.value = new Set([...openDropdowns.value]); // Memastikan Vue reaktif
};
</script>
