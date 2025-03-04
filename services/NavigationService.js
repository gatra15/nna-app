import { useRouter } from "vue-router";

export function useNavigationService() {
  const router = useRouter();

  function goToDashboard() {
    router.push("/dashboard");
  }

  function goToLogin() {
    router.push("/auth/login");
  }

  function goToRoot() {
    router.push("/");
  }

  return {
    goToDashboard,
    goToLogin,
    goToRoot,
  };
}
