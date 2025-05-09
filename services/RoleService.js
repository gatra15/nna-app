import { createRoleRepository } from "~/repositories/RoleRepository";
import { createBaseService } from "~/services/BaseService";

export const createRoleService = () => {
  const repository = createRoleRepository();
  const baseService = createBaseService(repository);

  return {
    ...baseService,

    // Metode tambahan untuk mengambil options
    async getOptions() {
      return await repository.getOptions();
    },
  };
};
