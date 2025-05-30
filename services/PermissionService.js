import { createBaseService } from "~/services/BaseService";
import { createPermissionRepository } from "~/repositories/PermissionRepository";

export const createPermissionService = () => {
  const repository = createPermissionRepository();
  const baseService = createBaseService(repository);

  return {
    ...baseService,

    async getOptions() {
      return await repository.getOptions();
    },
  };
};
