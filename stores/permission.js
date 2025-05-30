import { defineStore } from "pinia";
import { createPermissionService } from "~/services/PermissionService";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    items: [],
    selectedItem: null,
    options: [],
    loading: false,
    error: null,
    total: 0,
  }),

  actions: {
    async fetchAll(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const service = createPermissionService();
        let res = await service.getData(params);

        return {
          items: res.data,
          total: res.total,
        };
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
        const service = createPermissionService();
        this.selectedItem = await service.getDataById(id);
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async fetchOptions() {
      try {
        const service = createPermissionService();
        this.options = await service.getOptions();
      } catch (err) {
        this.error = err;
      }
    },

    async create(data) {
      const service = createPermissionService();
      return await service.create(data);
    },

    async update(id, data) {
      const service = createPermissionService();
      return await service.update(id, data);
    },

    async remove(id) {
      const service = createPermissionService();
      return await service.delete(id);
    },

    clearSelected() {
      this.selectedItem = null;
    },
  },
});
