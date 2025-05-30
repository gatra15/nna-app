import { createBaseRepository } from "~/repositories/BaseRepository";

export const createPositionRepository = () => {
  const baseRepo = createBaseRepository("/positions");

  return {
    ...baseRepo,

    async getOptions() {
      const api = useApi();
      return await api.request("/positions/options", { method: "GET" });
    },
  };
};
