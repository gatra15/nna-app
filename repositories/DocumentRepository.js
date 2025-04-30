import { useApi } from "@/composables/useApi";

export const createDocumentRepository = () => {
  const api = useApi();

  return {
    async getById(id) {
      return await api.request(`/documents/${id}`, { method: "GET" });
    },
    async getData() {
      return await api.request("/documents", { method: "GET" });
    },
    async getDocumentShare(type) {
      return await api.request(`/documents/shared/${type}`, { method: "GET" });
    },
    async create(data) {
      return await api.request("/documents", {
        method: "POST",
        isMultipart: true,
        data: data,
      });
    },
    async update(id, data) {
      return await api.request(`/documents/${id}`, {
        method: "PUT",
        data: data,
      });
    },
    async delete(id) {
      return await api.request(`/type/${id}`, { method: "DELETE" });
    },
  };
};
