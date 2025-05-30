import { createBaseRepository } from "~/repositories/BaseRepository";

export const createTypeRepository = () => {
  const baseRepo = createBaseRepository("/types");

  return {
    ...baseRepo,

    async getOptions() {
      const api = useApi();
      return await api.request("/types/options", { method: "GET" });
    },

    async getType() {
      const api = useApi();
      return await api.request("/types/list", { method: "GET" });
    },
  };
};
