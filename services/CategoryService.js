import { createCategoryRepository } from "~/repositories/CategoryRepository";

const categoryRepository = createCategoryRepository();

export const useCategoryService = () => {
  return {
    async fetchCategories() {
      try {
        const response = await categoryRepository.getData();
        return response;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },

    async fetchCategoryById(id) {
      try {
        const response = await categoryRepository.getById(id);
        return response.data;
      } catch (error) {
        console.error(`Error fetching category ID ${id}:`, error);
        throw error;
      }
    },

    async getOption() {
      try {
        const response = await categoryRepository.getOption();
        return response.data;
      } catch (error) {
        console.error(`Error get category options`, error);
        throw error;
      }
    },

    async createCategory(data) {
      try {
        return await categoryRepository.create(data);
      } catch (error) {
        console.error("Error creating category:", error);
        throw error;
      }
    },

    async updateCategory(id, data) {
      try {
        return await categoryRepository.update(id, data);
      } catch (error) {
        console.error(`Error updating category ID ${id}:`, error);
        throw error;
      }
    },

    async deleteCategory(id) {
      try {
        return await categoryRepository.delete(id);
      } catch (error) {
        console.error(`Error deleting category ID ${id}:`, error);
        throw error;
      }
    },
  };
};
