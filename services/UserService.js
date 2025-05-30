import { createUserRepository } from "~/repositories/UserRepository";
import { createBaseService } from "~/services/BaseService";

export function useUserService() {
  const repository = createUserRepository();
  const baseServices = createBaseService(repository);

  return {
    ...baseServices,

    async getOptions() {
      return await repository.getOptions();
    },
    async getUser() {
      return await repository.getUser();
    },
    async getPermission() {
      return await repository.getPermission();
    },
  };
}
