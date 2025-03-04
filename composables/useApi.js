import axios from "axios";
import { useRuntimeConfig } from "#app";
import { useAuthStore } from "@/stores/auth";
import { useNavigationService } from "~/services/NavigationService";

export const useApi = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const navigationService = useNavigationService();

  const instance = axios.create({
    baseURL: config.public.urlBase,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(
        "API Error: ",
        error.response?.data?.message || error.message
      );

      if (error.response?.status === 401) {
        authStore.clearToken();
        navigationService.goToRoot();
      }

      return Promise.reject(error);
    }
  );

  async function request(url, options = {}) {
    const response = await instance.request({ url, ...options });
    return response.data;
  }

  return { request };
};
