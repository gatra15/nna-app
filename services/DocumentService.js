import { createDocumentRepository } from "~/repositories/DocumentRepository";
import { createBaseService } from "~/services/BaseService";

export function useDocumentService() {
  const repository = createDocumentRepository();
  const baseServices = createBaseService(repository);

  return {
    ...baseServices,

    async getDocumentShare(type) {
      return await repository.getDocumentShare(type);
    },
  };
}
