import * as repo from '../repositories/projects.repository.js';

export const createProject = async (user, data) => {
  return await repo.create({ ...data, user_id: user.id });
};

export const getProjects = async (user) => {
  if (user.role === 'admin') return await repo.findAll();
  return await repo.findByUser(user.id);
};

export const getProjectById = async (id, user) => {
  const project = await repo.findById(id);
  if (!project) throw { status: 404, message: 'Project not found' };
  if (user.role !== 'admin' && project.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return project;
};

export const updateProject = async (id, user, data) => {
  const project = await repo.findById(id);
  if (!project) throw { status: 404, message: 'Project not found' };
  if (user.role !== 'admin' && project.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.update(id, data);
};

export const deleteProject = async (id, user) => {
  const project = await repo.findById(id);
  if (!project) throw { status: 404, message: 'Project not found' };
  if (user.role !== 'admin' && project.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.remove(id);
};
