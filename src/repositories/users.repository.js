const prisma = require('../prisma/client');

exports.create = async (data) => {
  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.password_hash,
        role: data.role
      }
    });
  } catch (err) {
    if (err.code === 'P2002') {
      throw { status: 409, message: 'Email already exists' };
    }
    throw { status: 500, message: err.message };
  }
};

exports.findByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: { email }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.findById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: { id: Number(id) }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.findAll = async () => {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.update = async (id, data) => {
  try {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        email: data.email
      }
    });
  } catch (err) {
    if (err.code === 'P2002') {
      throw { status: 409, message: 'Email already exists' };
    }
    throw { status: 500, message: err.message };
  }
};

exports.remove = async (id) => {
  try {
    await prisma.user.delete({
      where: { id: Number(id) }
    });

    return { id, message: 'User deleted' };
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};