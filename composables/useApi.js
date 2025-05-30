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
      "Content-Type": "application/json", // Default content type
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
    if (options.isMultipart) {
      const formData = new FormData();
      for (const key in options.data) {
        if (options.data[key] instanceof File) {
          formData.append(key, options.data[key]);
        } else {
          formData.append(key, options.data[key]);
        }
      }

      options.headers = {
        ...options.headers,
        "Content-Type": "multipart/form-data",
      };

      const response = await instance.post(url, formData, options);
      return response.data;
    }

    if (options.responseType === "blob") {
      const response = await instance.get(url, {
        ...options,
        responseType: "blob",
      });
      return response.data;
    }

    const response = await instance.request({ url, ...options });
    return response.data;
  }

  return { request };
};
