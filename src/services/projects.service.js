const repo = require('../repositories/projects.repository');

exports.createProject = async (user, data) => {
  return await repo.create({
    ...data,
    user_id: user.id
  });
};

exports.getProjects = async (user) => {
  if (user.role === 'admin') {
    return await repo.findAll();
  }
  return await repo.findByUser(user.id);
};

exports.getProjectById = async (id, user) => {
  const project = await repo.findById(id);
  if (!project) throw { status: 404, message: 'Project not found' };

  if (user.role !== 'admin' && project.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return project;
};

exports.updateProject = async (id, user, data) => {
  const project = await repo.findById(id);
  if (!project) throw { status: 404, message: 'Project not found' };

  if (user.role !== 'admin' && project.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.update(id, data);
};

exports.deleteProject = async (id, user) => {
  const project = await repo.findById(id);
  if (!project) throw { status: 404, message: 'Project not found' };

  if (user.role !== 'admin' && project.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.remove(id);
};