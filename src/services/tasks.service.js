const repo = require('../repositories/tasks.repository');
const projectsRepo = require('../repositories/projects.repository');

exports.createTask = async (user, data) => {
  const project = await projectsRepo.findById(data.project_id);
  if (!project) throw { status: 404, message: 'Project not found' };

  if (user.role !== 'admin' && project.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.create({
    ...data,
    user_id: user.id
  });
};

exports.getTasks = async (user) => {
  if (user.role === 'admin') return await repo.findAll();
  return await repo.findByUser(user.id);
};

exports.getTaskById = async (id, user) => {
  const task = await repo.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };

  if (user.role !== 'admin' && task.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return task;
};

exports.updateTask = async (id, user, data) => {
  const task = await repo.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };

  if (user.role !== 'admin' && task.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.update(id, data);
};

exports.deleteTask = async (id, user) => {
  const task = await repo.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };

  if (user.role !== 'admin' && task.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.remove(id);
};