import { createCategoryRepository } from "~/repositories/CategoryRepository";
import { createBaseService } from "~/services/BaseService";

export const useCategoryService = () => {
  const repository = createCategoryRepository();
  const baseServices = createBaseService(repository);

  return {
    ...baseServices,

    async getOptions() {
      return await repository.getOptions();
    },

    async getFolder() {
      return await repository.getFolder();
    },

    async getList() {
      return await repository.getList();
    },
  };
};
