import { defineStore } from "pinia";
import { menuItems } from "./menu";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isCollapsed: false,
    menuItems,
    openDropdowns: new Set(), // Tambahkan state untuk dropdown terbuka
  }),

  actions: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },

    navigateTo(route, router) {
      if (route && router && router.currentRoute.value.path !== route) {
        router.push(route);
      }
    },

    toggleDropdown(menu) {
      if (this.openDropdowns.has(menu)) {
        this.openDropdowns.delete(menu);
      } else {
        this.openDropdowns.add(menu);
      }
      this.openDropdowns = new Set(this.openDropdowns); // Pastikan reaktif
    },
  },
});
