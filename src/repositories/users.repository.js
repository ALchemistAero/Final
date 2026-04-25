import prisma from '../prisma/client.js';

export const create = async (data) => {
  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.password_hash || data.passwordHash,
        role: data.role || 'user',
      },
      select: { id: true, name: true, email: true, role: true },
    });
  } catch (err) {
    if (err.code === 'P2002') throw { status: 409, message: 'Email already exists' };
    throw { status: 500, message: err.message };
  }
};

export const findByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, email: true, role: true },
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const findAll = async () => {
  try {
    return await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

export const update = async (id, data) => {
  try {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: { name: data.name, email: data.email },
      select: { id: true, name: true, email: true, role: true },
    });
  } catch (err) {
    if (err.code === 'P2002') throw { status: 409, message: 'Email already exists' };
    throw { status: 500, message: err.message };
  }
};

export const remove = async (id) => {
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    return { id: Number(id), message: 'User deleted' };
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};
