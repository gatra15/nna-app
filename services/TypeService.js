import { createTypeRepository } from "~/repositories/TypeRepository";

export function useTypeService() {
  const typeRepository = createTypeRepository();

  async function getData() {
    return await typeRepository.getData();
  }

  async function getById(id) {
    return await typeRepository.getById(id);
  }

  async function getOption() {
    return await typeRepository.getOption();
  }

  async function create(data) {
    return await typeRepository.create(data);
  }

  async function update(id, data) {
    return await typeRepository.update(id, data);
  }

  async function destroy(id) {
    return await typeRepository.delete(id);
  }

  return {
    getById,
    getData,
    getOption,
    create,
    update,
    destroy,
  };
}
