import { defineStore } from "pinia";
import { useCategoryService } from "~/services/CategoryService";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    category: null,
    error: null,
    loading: false,
    options: [],
    folder: [],
    list: [],
  }),

  actions: {
    setCategories(categories) {
      this.categories = categories;
    },

    async fetchAll(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        const data = await categoryService.fetchAll(params);
        this.setCategories(data);
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching categories:", error);
      } finally {
        this.loading = false;
      }
    },

    async getFolder() {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        const data = await categoryService.getFolder();
        this.folder = data;
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching categories:", error);
      } finally {
        this.loading = false;
      }
    },

    async getList() {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        const data = await categoryService.getList();
        this.list = data;
      } catch (err) {
        this.error = err.message;
        console.error("Error getting list categories:", this.error);
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        this.category = await categoryService.getDataById(id);
      } catch (error) {
        this.error = error.message;
        console.error(`Error fetching category ID ${id}:`, error);
      } finally {
        this.loading = false;
      }
    },

    async getOptions() {
      this.loading = true;
      this.error = null;

      try {
        const categoryService = useCategoryService();
        const res = await categoryService.getOptions();
        this.options = res.data;
      } catch (error) {
        this.error = error.message;
        console.error(`Error getting category Option`, error);
      } finally {
        this.loading = false;
      }
    },

    async create(categoryData) {
      try {
        const categoryService = useCategoryService();
        const newCategory = await categoryService.create(categoryData);
        this.categories.push(newCategory);
      } catch (error) {
        this.error = error.message;
        console.error("Error creating category:", error);
      }
    },

    async update(id, categoryData) {
      try {
        const categoryService = useCategoryService();
        const updatedCategory = await categoryService.update(id, categoryData);
        const index = this.categories.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
      } catch (error) {
        this.error = error.message;
        console.error(`Error updating category ID ${id}:`, error);
      }
    },

    async delete(id) {
      try {
        const categoryService = useCategoryService();
        await categoryService.delete(id);
        this.categories = this.categories.filter((c) => c.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error(`Error deleting category ID ${id}:`, error);
      }
    },
  },
});
