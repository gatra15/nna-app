import { useApi } from "@/composables/useApi";

export const createTypeRepository = () => {
  const api = useApi();

  return {
    async getById(id) {
      return await api.request(`/types/${id}`, { method: "GET" });
    },
    async getData() {
      return await api.request("/types", { method: "GET" });
    },
    async getOption() {
      return await api.request("/types/options", { method: "GET" });
    },
    async create(data) {
      return await api.request("/types", {
        method: "POST",
        data: data,
      });
    },
    async update(id, data) {
      return await api.request(`/types/${id}`, {
        method: "PUT",
        data: data,
      });
    },
    async delete(id) {
      return await api.request(`/type/${id}`, { method: "DELETE" });
    },
  };
};
