import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthService } from "~/services/AuthService";

export default defineNuxtRouteMiddleware(async (to) => {
  const authService = useAuthService();
  const isAuthenticated = await authService.checkUserSession();

  if (!isAuthenticated && to.path !== "/auth/login") {
    return navigateTo("/auth/login", { replace: true });
  }

  if (isAuthenticated && (to.path === "/auth/login" || to.path === "/")) {
    return navigateTo("/dashboard", { replace: true });
  }
});
