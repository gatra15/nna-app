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

  // Fungsi untuk meng-handle multipart/form-data dan download file (blob)
  async function request(url, options = {}) {
    // Cek apakah data menggunakan multipart/form-data
    if (options.isMultipart) {
      // Jika ya, kita buat FormData
      const formData = new FormData();
      for (const key in options.data) {
        if (options.data[key] instanceof File) {
          // Untuk file, append dengan cara ini
          formData.append(key, options.data[key]);
        } else {
          // Untuk data lainnya
          formData.append(key, options.data[key]);
        }
      }

      // Ubah header Content-Type menjadi multipart/form-data
      options.headers = {
        ...options.headers,
        "Content-Type": "multipart/form-data",
      };

      const response = await instance.post(url, formData, options);
      return response.data;
    }

    // Jika responseType adalah 'blob' (untuk download file)
    if (options.responseType === "blob") {
      const response = await instance.get(url, {
        ...options,
        responseType: "blob",
      });
      return response.data;
    }

    // Untuk request selain multipart dan blob
    const response = await instance.request({ url, ...options });
    return response.data;
  }

  return { request };
};
