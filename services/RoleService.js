import { createRoleRepository } from "~/repositories/RoleRepository";
import { createBaseService } from "~/services/BaseService";

export const createRoleService = () => {
  const repository = createRoleRepository();
  const baseService = createBaseService(repository);

  return {
    ...baseService,

    async getOptions() {
      return await repository.getOptions();
    },
    async getRoleWithPermission(roleId) {
      return await repository.getRoleWithPermission(roleId);
    },
  };
};
