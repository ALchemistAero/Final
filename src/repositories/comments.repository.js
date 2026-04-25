const prisma = require('../prisma/client');

exports.create = async (data) => {
  try {
    return await prisma.comment.create({
      data: {
        taskId: data.task_id,
        userId: data.user_id,
        body: data.body
      }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.findAll = async () => {
  try {
    return await prisma.comment.findMany();
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.findById = async (id) => {
  try {
    return await prisma.comment.findUnique({
      where: { id: Number(id) }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.update = async (id, data) => {
  try {
    return await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        body: data.body
      }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.remove = async (id) => {
  try {
    await prisma.comment.delete({
      where: { id: Number(id) }
    });

    return { id, message: 'Comment deleted' };
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};