import { createBaseRepository } from "~/repositories/BaseRepository";

export const createRoleRepository = () => {
  const baseRepo = createBaseRepository("/roles");

  return {
    ...baseRepo,

    // Menambahkan getOptions sebagai metode khusus untuk RoleRepository
    async getOptions() {
      const api = useApi();
      return await api.request("/roles/options", { method: "GET" });
    },
  };
};
