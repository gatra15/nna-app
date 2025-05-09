export const createBaseService = (repository) => {
  return {
    async getData() {
      const response = await repository.getData();
      return response?.data || [];
    },

    async getDataById(id) {
      const response = await repository.getDataById(id);
      return response?.data || null;
    },

    async create(data) {
      const response = await repository.create(data);
      return response?.data;
    },

    async update(id, data) {
      const response = await repository.update(id, data);
      return response?.data;
    },

    async delete(id) {
      const response = await repository.delete(id);
      return response?.data;
    },
  };
};
