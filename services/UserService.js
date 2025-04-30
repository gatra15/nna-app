import { createUserRepository } from "~/repositories/UserRepository";

export function useUserService() {
  const userRepository = createUserRepository();

  async function loadUser() {
    return await userRepository.getUser();
  }

  async function getUserById(userId) {
    return await userRepository.getUserById(userId);
  }

  async function getOption() {
    return await userRepository.getOption();
  }

  async function getUsers() {
    return await userRepository.getUsers();
  }

  async function createUser(userData) {
    if (!userData.email.includes("@")) {
      throw new Error("Email tidak valid");
    }

    return await userRepository.createUser(userData);
  }

  async function updateUser(userId, userData) {
    return await userRepository.updateUser(userId, userData);
  }

  async function deleteUser(userId) {
    return await userRepository.deleteUser(userId);
  }

  return {
    loadUser,
    getUserById,
    getUsers,
    getOption,
    createUser,
    updateUser,
    deleteUser,
  };
}
