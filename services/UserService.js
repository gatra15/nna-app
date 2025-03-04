import { createUserRepository } from "@/repositories/UserRepositories";

export function useUserService() {
  const userRepository = createUserRepository();

  async function loadUser() {
    return await userRepository.getUser();
  }

  async function getUserById(userId) {
    return await userRepository.getUserById(userId);
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
    createUser,
    updateUser,
    deleteUser,
  };
}
