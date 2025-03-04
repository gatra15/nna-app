import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: useCookie("auth_token").value || "",
  }),
  actions: {
    loadToken() {
      const token = useCookie("auth_token");
      this.token = token.value;
    },
    setToken(token) {
      const cookie = useCookie("auth_token");
      cookie.value = token;
      this.token = token;
    },
    clearToken() {
      const cookie = useCookie("auth_token");
      cookie.value = null;
      this.token = "";
    },
  },
});
