const repo = require('../repositories/comments.repository');
const tasksRepo = require('../repositories/tasks.repository');

exports.createComment = async (user, data) => {
  const task = await tasksRepo.findById(data.task_id);
  if (!task) throw { status: 404, message: 'Task not found' };

  return await repo.create({
    ...data,
    user_id: user.id
  });
};

exports.getComments = async (user) => {
  if (user.role === 'admin') return await repo.findAll();
  return await repo.findAll(); // filter later if needed
};

exports.getCommentById = async (id, user) => {
  const comment = await repo.findById(id);
  if (!comment) throw { status: 404, message: 'Comment not found' };

  if (user.role !== 'admin' && comment.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return comment;
};

exports.updateComment = async (id, user, data) => {
  const comment = await repo.findById(id);
  if (!comment) throw { status: 404, message: 'Comment not found' };

  if (user.role !== 'admin' && comment.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.update(id, data);
};

exports.deleteComment = async (id, user) => {
  const comment = await repo.findById(id);
  if (!comment) throw { status: 404, message: 'Comment not found' };

  if (user.role !== 'admin' && comment.user_id !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return await repo.remove(id);
};