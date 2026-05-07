import * as repo from '../repositories/tasks.repository.js';
import * as projectsRepo from '../repositories/projects.repository.js';

export const createTask = async (user, data) => {
  const project = await projectsRepo.findById(data.project_id);
  if (!project) throw { status: 404, message: 'Project not found' };
  if (user.role !== 'ADMIN' && project.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.create({ ...data, user_id: user.id });
};

export const getTasks = async (user) => {
  if (user.role === 'ADMIN') return await repo.findAll();
  return await repo.findByUser(user.id);
};

export const getTaskById = async (id, user) => {
  const task = await repo.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };
  if (user.role !== 'ADMIN' && task.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return task;
};

export const updateTask = async (id, user, data) => {
  const task = await repo.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };
  if (user.role !== 'ADMIN' && task.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.update(id, data);
};

export const deleteTask = async (id, user) => {
  const task = await repo.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };
  if (user.role !== 'ADMIN' && task.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.remove(id);
};
