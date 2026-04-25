import * as repo from '../repositories/users.repository.js';

export const createUser = async (data) => {
  return await repo.create(data);
};

export const getAllUsers = async () => {
  return await repo.findAll();
};

export const getUserById = async (id, currentUser) => {
  if (currentUser.role !== 'admin' && currentUser.id !== Number(id)) {
    throw { status: 403, message: 'Forbidden' };
  }
  const user = await repo.findById(id);
  if (!user) throw { status: 404, message: 'User not found' };
  return user;
};

export const updateUser = async (id, currentUser, data) => {
  if (currentUser.role !== 'admin' && currentUser.id !== Number(id)) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.update(id, data);
};

export const deleteUser = async (id) => {
  return await repo.remove(id);
};
