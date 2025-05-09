import { useApi } from "~/composables/useApi";

export const createBaseRepository = (basePath) => {
  const api = useApi();

  return {
    async getData() {
      return await api.request(basePath, { method: "GET" });
    },
    async getDataById(id) {
      return await api.request(`${basePath}/${id}`, { method: "GET" });
    },
    async create(data) {
      return await api.request(basePath, {
        method: "POST",
        data,
      });
    },
    async update(id, data) {
      return await api.request(`${basePath}/${id}`, {
        method: "PUT",
        data: data,
      });
    },
    async delete(id) {
      return await api.request(`${basePath}/${id}`, {
        method: "DELETE",
      });
    },
  };
};
