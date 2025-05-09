import { defineStore } from "pinia";
import { useUserService } from "~/services/UserService";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    user: null,
    loading: false,
    error: null,
    options: [],
    stateOptions: [
      {
        id: 1,
        text: "Active",
        value: 1,
      },
      {
        id: 2,
        text: "Inactive",
        value: 2,
      },
    ],
  }),

  actions: {
    setUser(userData) {
      this.user = userData;
    },
    clearUser() {
      this.user = null;
    },

    async loadUser() {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        const user = await userService.loadUser();
        this.user = user;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchUsers() {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        const users = await userService.getUsers();
        this.users = users.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserById(userId) {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        this.user = await userService.getUser(userId);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async getOption() {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        const res = await userService.getOption();
        this.options = res.data;
        console.log("Option: ", this.options);
      } catch (error) {
        this.error = error.message;
        console.error(`Error getting user Option`, error);
      } finally {
        this.loading = false;
      }
    },

    async addUser(userData) {
      this.loading = true;
      this.error = null;

      try {
        const userService = useUserService();
        await userService.createUser(userData);
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
        await userService.updateUser(userId, userData);
        await this.fetchUsers(); // Refresh daftar user
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
        await userService.deleteUser(userId);
        await this.fetchUsers(); // Refresh daftar user
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
