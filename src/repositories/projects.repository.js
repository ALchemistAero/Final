import prisma from '../prisma/client.js';

export const create = async (data) => {
  try {
    return await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        status: data.status,
        userId: Number(data.user_id),
      },
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findAll = async () => {
  try {
    return await prisma.project.findMany();
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findByUser = async (userId) => {
  try {
    return await prisma.project.findMany({ where: { userId: Number(userId) } });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findById = async (id) => {
  try {
    return await prisma.project.findUnique({ where: { id: Number(id) } });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const update = async (id, data) => {
  try {
    return await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        description: data.description,
        status: data.status,
      },
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const remove = async (id) => {
  try {
    await prisma.project.delete({ where: { id: Number(id) } });
    return { id: Number(id), message: 'Project deleted' };
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};
