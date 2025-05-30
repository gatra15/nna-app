export const createBaseService = (repository) => {
  return {
    async getData(params = {}) {
      const response = await repository.getData(params);
      return response || [];
    },

    async getDataById(id) {
      const response = await repository.getDataById(id);
      return response || null;
    },

    async create(data) {
      const response = await repository.create(data);
      return response;
    },

    async update(id, data) {
      const response = await repository.update(id, data);
      return response;
    },

    async delete(id) {
      const response = await repository.delete(id);
      return response;
    },
  };
};
