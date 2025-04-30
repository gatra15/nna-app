<template>
  <li>
    <button
      @click="
        item.children
          ? toggleDropdown(item.text)
          : sidebarStore.navigateTo(item.route, router)
      "
      class="group flex text-xs text-lempung-100 items-center justify-between w-full p-3 rounded-lg hover:bg-white hover:text-matcha"
      :class="{
        'font-bold': item.children || item.text === 'Dashboard',
        'font-normal': !item.children && item.text !== 'Dashboard',
      }"
    >
      <span class="flex items-center gap-2">
        <component
          :is="icons[item.icon]"
          class="w-6 h-6 text-lempung group-hover:text-matcha transition-colors"
        />
        <span class="group-hover:text-gray-700 transition-colors">
          {{ item.text }}
        </span>
      </span>
      <ChevronDownIcon
        v-if="item.children"
        :class="{
          'rotate-180': openDropdowns.has(item.text),
          'group-hover:text-matcha': true,
        }"
        class="w-5 h-5 text-lempung transition-colors"
      />
    </button>

    <ul v-show="openDropdowns.has(item.text)">
      <SidebarItem
        v-for="child in item.children"
        :key="child.text"
        :item="child"
        :router="router"
        :level="level + 1"
        class="ml-8 text-xs"
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
