import { defineStore } from "pinia";
import { createRoleService } from "~/services/RoleService";

export const useRoleStore = defineStore("role", {
  state: () => ({
    items: [],
    selectedItem: null,
    options: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        const service = createRoleService();
        this.items = await service.getData();
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      this.loading = true;
      this.error = null;
      try {
        const service = createRoleService();
        this.selectedItem = await service.getDataById(id);
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchOptions() {
      try {
        const service = createRoleService();
        this.options = await service.getOptions();
      } catch (err) {
        this.error = err;
      }
    },

    async create(data) {
      const service = createRoleService();
      return await service.create(data);
    },

    async update(id, data) {
      const service = createRoleService();
      return await service.update(id, data);
    },

    async remove(id) {
      const service = createRoleService();
      return await service.delete(id);
    },

    clearSelected() {
      this.selectedItem = null;
    },
  },
});
