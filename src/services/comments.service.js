import * as repo from '../repositories/comments.repository.js';
import * as tasksRepo from '../repositories/tasks.repository.js';

export const createComment = async (user, data) => {
  const task = await tasksRepo.findById(data.task_id);
  if (!task) throw { status: 404, message: 'Task not found' };
  if (user.role !== 'ADMIN' && task.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.create({ ...data, user_id: user.id });
};

export const getComments = async (user) => {
  if (user.role === 'ADMIN') return await repo.findAll();
  return await repo.findByUser(user.id);
};

export const getCommentById = async (id, user) => {
  const comment = await repo.findById(id);
  if (!comment) throw { status: 404, message: 'Comment not found' };
  if (user.role !== 'ADMIN' && comment.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return comment;
};

export const updateComment = async (id, user, data) => {
  const comment = await repo.findById(id);
  if (!comment) throw { status: 404, message: 'Comment not found' };
  if (user.role !== 'ADMIN' && comment.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.update(id, data);
};

export const deleteComment = async (id, user) => {
  const comment = await repo.findById(id);
  if (!comment) throw { status: 404, message: 'Comment not found' };
  if (user.role !== 'ADMIN' && comment.userId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }
  return await repo.remove(id);
};
