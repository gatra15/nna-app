import { useApi } from "@/composables/useApi";

export const createCategoryRepository = () => {
  const api = useApi();

  return {
    async getById(id) {
      return await api.request(`/categories/${id}`, { method: "GET" });
    },
    async getData() {
      return await api.request("/categories/folder", { method: "GET" });
    },
    async getOption() {
      return await api.request("/categories/options", { method: "GET" });
    },
    async create(data) {
      return await api.request("/categories", {
        method: "POST",
        data: data,
      });
    },
    async update(id, data) {
      return await api.request(`/categories/${id}`, {
        method: "PUT",
        data: data,
      });
    },
    async delete(id) {
      return await api.request(`/type/${id}`, { method: "DELETE" });
    },
  };
};
