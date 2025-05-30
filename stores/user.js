import axios from "axios";
import { defineStore } from "pinia";
import { useUserService } from "~/services/UserService";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    user: null,
    userPermission: [],
    loading: false,
    error: null,
    options: [],
    stateOptions: [
      { id: 1, text: "Active", value: 1 },
      { id: 2, text: "Inactive", value: 2 },
    ],
  }),

  actions: {
    setUser(userData) {
      this.user = userData;
    },

    clearUser() {
      this.user = null;
    },

    hasPermission(permissionName) {
      return this.userPermission.includes(permissionName);
    },

    async loadUser() {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        const res = await userService.getUser();
        this.user = res;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchUsers(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        const res = await userService.getData(params);
        return {
          items: res.data,
          total: res.total,
        };
      } catch (err) {
        console.error("Error fetching users:", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserById(userId) {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        const res = await userService.getDataById(userId);
        this.user = res;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async getOptions() {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        const res = await userService.getOptions();
        this.options = res.data;
      } catch (err) {
        console.error("Error getting user options:", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async getPermission() {
      this.error = null;

      try {
        const userService = useUserService();
        const res = await userService.getPermission();
        this.userPermission = res;
      } catch (err) {
        console.error("Error getting user permission:", err);
        this.error = err;
      }
    },

    async addUser(userData) {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        await userService.create(userData);
        await this.fetchUsers();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async updateUser(userId, userData) {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        await userService.update(userId, userData);
        await this.fetchUsers();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async removeUser(userId) {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        await userService.delete(userId);
        await this.fetchUsers();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
