import { createBaseRepository } from "~/repositories/BaseRepository";

export const createPermissionRepository = () => {
  const baseRepo = createBaseRepository("/permissions");

  return {
    ...baseRepo,

    async getOptions() {
      const api = useApi();
      return await api.request("/permissions/options", { method: "GET" });
    },
  };
};
