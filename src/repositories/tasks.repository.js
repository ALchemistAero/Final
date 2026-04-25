const prisma = require('../prisma/client');

exports.create = async (data) => {
  try {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.due_date,
        projectId: data.project_id,
        userId: data.user_id
      }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.findAll = async () => {
  try {
    return await prisma.task.findMany();
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.findByUser = async (userId) => {
  try {
    return await prisma.task.findMany({
      where: { userId: Number(userId) }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.findById = async (id) => {
  try {
    return await prisma.task.findUnique({
      where: { id: Number(id) }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.update = async (id, data) => {
  try {
    return await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.due_date
      }
    });
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};

exports.remove = async (id) => {
  try {
    await prisma.task.delete({
      where: { id: Number(id) }
    });

    return { id, message: 'Task deleted' };
  } catch (err) {
    throw { status: 500, message: err.message };
  }
};