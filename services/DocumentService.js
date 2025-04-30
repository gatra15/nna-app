import { createDocumentRepository } from "~/repositories/DocumentRepository";

export function useDocumentService() {
  const documentRepository = createDocumentRepository();

  async function getData() {
    return await documentRepository.getData();
  }

  async function getById(id) {
    return await documentRepository.getById(id);
  }

  async function getDocumentShare(type) {
    return await documentRepository.getDocumentShare(type);
  }

  async function create(data) {
    return await documentRepository.create(data);
  }

  async function update(id, data) {
    return await documentRepository.update(id, data);
  }

  async function destroy(id) {
    return await documentRepository.delete(id);
  }

  return {
    getById,
    getData,
    getDocumentShare,
    create,
    update,
    destroy,
  };
}
