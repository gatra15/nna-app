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
        const value = options.data[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
        } else if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }

      const headers = { ...options.headers };
      delete headers["Content-Type"];

      const config = {
        ...options,
        headers,
      };

      const response = await instance.post(url, formData, config);
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
