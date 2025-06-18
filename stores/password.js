import { defineStore } from "pinia";

export const usePasswordStore = defineStore("password", {
  state: () => ({
    changePasswordVisible: false,
  }),
  actions: {
    openChangePassword() {
      this.changePasswordVisible = true;
    },

    closeChangePassword() {
      this.changePasswordVisible = false;
    },
  },
});
