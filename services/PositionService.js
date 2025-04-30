import { createPositionRepository } from "~/repositories/PositionRepository";

export function usePositionService() {
  const positionRepository = createPositionRepository();

  async function getPositions() {
    return await positionRepository.getPositions();
  }

  async function getPositionById(id) {
    return await positionRepository.getPositionById(id);
  }

  async function getOption() {
    return await positionRepository.getOptions();
  }

  async function createPosition(data) {
    return await positionRepository.createPosition(data);
  }

  async function updatePosition(id, data) {
    return await positionRepository.updatePosition(id, data);
  }

  async function deletePosition(id) {
    return await positionRepository.deletePosition(id);
  }

  return {
    getPositionById,
    getPositions,
    getOption,
    createPosition,
    updatePosition,
    deletePosition,
  };
}
