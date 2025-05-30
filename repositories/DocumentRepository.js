import { createBaseRepository } from "~/repositories/BaseRepository";

export const createDocumentRepository = () => {
  const baseRepo = createBaseRepository("/documents");

  return {
    ...baseRepo,

    async getDocumentShare(type) {
      const api = useApi();
      return await api.request(`/documents/shared/${type}`, { method: "GET" });
    },
  };
};
