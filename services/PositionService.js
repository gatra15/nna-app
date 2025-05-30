import { createPositionRepository } from "~/repositories/PositionRepository";
import { createBaseService } from "~/services/BaseService";

export function usePositionService() {
  const repository = createPositionRepository();
  const baseServices = createBaseService(repository);

  return {
    ...baseServices,

    async getOptions() {
      return await repository.getOptions();
    },
  };
}
