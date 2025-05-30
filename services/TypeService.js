import { createTypeRepository } from "~/repositories/TypeRepository";
import { createBaseService } from "~/services/BaseService";

export function useTypeService() {
  const repository = createTypeRepository();
  const baseServices = createBaseService(repository);

  return {
    ...baseServices,

    async getOptions() {
      return await repository.getOptions();
    },
    async getType() {
      return await repository.getType();
    },
  };
}
