const repo = require('../repositories/users.repository');

exports.createUser = async (data) => {
  return await repo.create(data);
};

exports.getAllUsers = async () => {
  return await repo.findAll();
};

exports.getUserById = async (id, currentUser) => {
  if (currentUser.role !== 'admin' && currentUser.id != id) {
    throw { status: 403, message: 'Forbidden' };
  }

  const user = await repo.findById(id);
  if (!user) throw { status: 404, message: 'User not found' };

  return user;
};

exports.updateUser = async (id, currentUser, data) => {
  if (currentUser.role !== 'admin' && currentUser.id != id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.update(id, data);
};

exports.deleteUser = async (id) => {
  return await repo.remove(id);
};