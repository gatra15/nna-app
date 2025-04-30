import axios from "axios";

export const useApiPlain = () => {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: config.public.urlBase,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const get = (url, config = {}) => {
    return api.get(url, config);
  };

  // Anda juga bisa menambahkan method POST, PUT, DELETE, dll jika diperlukan
  const post = (url, data, config = {}) => {
    return api.post(url, data, config);
  };

  return { get, post };
};
