import { defineStore } from "pinia";
import { createRoleService } from "~/services/RoleService";

export const useRoleStore = defineStore("role", {
  state: () => ({
    items: [],
    role: null,
    error: null,
    loading: false,
    options: [],
    permissions: [],
    selectedItem: null,
  }),

  actions: {
    async fetchRoles(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const service = createRoleService();
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

    async fetchRoleWithPermissions(roleId) {
      this.loading = true;
      this.error = null;
      try {
        const service = createRoleService();
        const response = await service.getRoleWithPermission(roleId);
        this.role = response.role;
        this.permissions = response.all_permissions || [];
      } catch (err) {
        this.error = err;
        this.items = [];
        this.permissions = [];
      } finally {
        this.loading = false;
      }
    },

    clear() {
      this.role = [];
      this.permissions = [];
      this.error = null;
      this.loading = false;
    },

    clearSelected() {
      this.selectedItem = null;
    },
  },
});
