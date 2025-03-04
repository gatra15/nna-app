import { useApi } from "@/composables/useApi";

export const createUserRepository = () => {
  const api = useApi();

  return {
    async getUser() {
      return await api.request("/user", { method: "GET" });
    },
    async getUserById(id) {
      return await api.request(`/users/${id}`, { method: "GET" });
    },
    async getUsers() {
      return await api.request("/users", { method: "GET" });
    },
    async createUser(userData) {
      return await api.request("/users", { method: "POST", data: userData });
    },
    async updateUser(id, userData) {
      return await api.request(`/users/${id}`, {
        method: "PUT",
        data: userData,
      });
    },
    async deleteUser(id) {
      return await api.request(`/users/${id}`, { method: "DELETE" });
    },
  };
};
