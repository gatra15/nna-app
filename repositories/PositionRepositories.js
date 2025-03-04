import { useApi } from "@/composables/useApi";

export const createPositionRepository = () => {
  const api = useApi();

  return {
    async getPositionById(id) {
      return await api.request(`/positions/${id}`, { method: "GET" });
    },
    async getPositions() {
      return await api.request("/positions", { method: "GET" });
    },
    async createPosition(positionData) {
      return await api.request("/positions", {
        method: "POST",
        data: positionData,
      });
    },
    async updatePosition(id, positionData) {
      return await api.request(`/positions/${id}`, {
        method: "PUT",
        data: positionData,
      });
    },
    async deletePosition(id) {
      return await api.request(`/positions/${id}`, { method: "DELETE" });
    },
  };
};
