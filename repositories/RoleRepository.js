import { createBaseRepository } from "~/repositories/BaseRepository";

export const createRoleRepository = () => {
  const baseRepo = createBaseRepository("/roles");

  return {
    ...baseRepo,

    async getOptions() {
      const api = useApi();
      return await api.request("/roles/options", { method: "GET" });
    },
    async getRoleWithPermission(roleId) {
      const api = useApi();
      return await api.request(`roles/${roleId}/edit`, { method: "GET" });
    },
  };
};
