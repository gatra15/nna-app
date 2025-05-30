import { createBaseRepository } from "~/repositories/BaseRepository";

export const createUserRepository = () => {
  const baseRepo = createBaseRepository("/users");

  return {
    ...baseRepo,

    async getOptions() {
      const api = useApi();
      return await api.request("/users/options", { method: "GET" });
    },
    async getUser() {
      const api = useApi();
      return await api.request("/user", { method: "GET" });
    },
    async getPermission() {
      const api = useApi();
      return await api.request("/users/permission", { method: "GET" });
    },
  };
};
