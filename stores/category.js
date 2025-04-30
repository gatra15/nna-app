import { defineStore } from "pinia";
import { useCategoryService } from "~/services/CategoryService";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    category: null,
    error: null,
    loading: false,
    options: [],
  }),

  actions: {
    setCategories(categories) {
      this.categories = categories;
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        const data = await categoryService.fetchCategories();
        this.setCategories(data);
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching categories:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCategoryById(id) {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        this.category = await categoryService.fetchCategoryById(id);
      } catch (error) {
        this.error = error.message;
        console.error(`Error fetching category ID ${id}:`, error);
      } finally {
        this.loading = false;
      }
    },

    async getOption() {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        const res = await categoryService.getOption();
        this.options = res;
      } catch (error) {
        this.error = error.message;
        console.error(`Error getting category Option`, error);
      } finally {
        this.loading = false;
      }
    },

    async addCategory(categoryData) {
      try {
        const categoryService = useCategoryService();
        const newCategory = await categoryService.createCategory(categoryData);
        this.categories.push(newCategory);
      } catch (error) {
        this.error = error.message;
        console.error("Error creating category:", error);
      }
    },

    async updateCategory(id, categoryData) {
      try {
        const categoryService = useCategoryService();
        const updatedCategory = await categoryService.updateCategory(
          id,
          categoryData
        );
        const index = this.categories.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
      } catch (error) {
        this.error = error.message;
        console.error(`Error updating category ID ${id}:`, error);
      }
    },

    async deleteCategory(id) {
      try {
        const categoryService = useCategoryService();
        await categoryService.deleteCategory(id);
        this.categories = this.categories.filter((c) => c.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error(`Error deleting category ID ${id}:`, error);
      }
    },
  },
});
