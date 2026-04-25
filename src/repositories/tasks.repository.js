import prisma from '../prisma/client.js';

export const create = async (data) => {
  try {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.due_date ? new Date(data.due_date) : undefined,
        projectId: Number(data.project_id),
        userId: Number(data.user_id),
      },
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findAll = async () => {
  try {
    return await prisma.task.findMany();
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findByUser = async (userId) => {
  try {
    return await prisma.task.findMany({ where: { userId: Number(userId) } });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findById = async (id) => {
  try {
    return await prisma.task.findUnique({ where: { id: Number(id) } });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const update = async (id, data) => {
  try {
    return await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.due_date ? new Date(data.due_date) : undefined,
      },
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const remove = async (id) => {
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    return { id: Number(id), message: 'Task deleted' };
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};
