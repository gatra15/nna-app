import { createBaseRepository } from "~/repositories/BaseRepository";

export const createCategoryRepository = () => {
  const baseRepo = createBaseRepository("/categories");

  return {
    ...baseRepo,

    async getOptions() {
      const api = useApi();
      return await api.request("/categories/options", { method: "GET" });
    },
    async getFolder() {
      const api = useApi();
      return await api.request("/categories/folder", { method: "GET" });
    },
    async getList() {
      const api = useApi();
      return await api.request("/categories/list", { method: "GET" });
    },
  };
};
