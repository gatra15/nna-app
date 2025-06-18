import { useApi } from "@/composables/useApi";
import { useAuthStore } from "@/stores/auth";
import { useNavigationService } from "@/services/NavigationService";
import { useUserStore } from "@/stores/user";

function useAuthService() {
  const api = useApi();
  const authStore = useAuthStore();
  const navigationService = useNavigationService();
  const userStore = useUserStore();

  async function login(credentials) {
    try {
      const { token } = await api.request("/auth/login", {
        method: "POST",
        data: credentials,
      });

      authStore.setToken(token);

      await userStore.loadUser();
      navigationService.goToDashboard();
    } catch (error) {
      throw error;
    }
  }

  async function changePassword(payload) {
    try {
      const response = await api.request("/users/change-pass", {
        method: "POST",
        data: payload,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function checkUserSession() {
    authStore.loadToken();

    if (!authStore.token) {
      return false;
    }

    try {
      await userStore.loadUser();
      await userStore.getPermission();
      return true;
    } catch (error) {
      authStore.clearToken();
      return false;
    }
  }

  function logout() {
    authStore.clearToken();
    navigationService.goToLogin();
  }

  return {
    changePassword,
    checkUserSession,
    login,
    logout,
  };
}

export { useAuthService };
