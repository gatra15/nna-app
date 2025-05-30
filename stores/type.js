import { defineStore } from "pinia";
import { useTypeService } from "~/services/TypeService";

export const useTypeStore = defineStore("type", {
  state: () => ({
    types: [],
    options: [],
    type: null,
    loading: false,
    error: null,
  }),

  actions: {
    setTypes(types) {
      this.types = types;
    },

    async fetchTypes() {
      this.error = null;

      try {
        const typeService = useTypeService();
        const data = await typeService.getType();
        this.setTypes(data);
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching types:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTypeById(id) {
      this.loading = true;
      this.error = null;

      try {
        const typeService = useTypeService();
        this.type = await typeService.getById(id);
      } catch (error) {
        this.error = error.message;
        console.error(`Error fetching type ID ${id}:`, error);
      } finally {
        this.loading = false;
      }
    },

    async getOptions() {
      this.loading = true;
      this.error = null;

      try {
        const typeService = useTypeService();
        const res = await typeService.getOptions();
        this.options = res.data;
      } catch (error) {
        this.error = error.message;
        console.error(`Error getting type Option`, error);
      } finally {
        this.loading = false;
      }
    },

    async add(typeData) {
      try {
        const typeService = useTypeService();
        const newType = await typeService.create(typeData);
        this.types.push(newType);
      } catch (error) {
        this.error = error.message;
        console.error("Error creating type:", error);
      }
    },

    async update(id, typeData) {
      try {
        const typeService = useTypeService();
        const updatedType = await typeService.update(id, typeData);
        const index = this.types.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.types[index] = updatedType;
        }
      } catch (error) {
        this.error = error.message;
        console.error(`Error updating type ID ${id}:`, error);
      }
    },

    async delete(id) {
      try {
        const typeService = useTypeService();
        await typeService.delete(id);
        this.types = this.types.filter((c) => c.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error(`Error deleting type ID ${id}:`, error);
      }
    },
  },
});
