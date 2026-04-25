const service = require('../services/tasks.service');

exports.create = async (req, res) => {
  try {
    const task = await service.createTask(req.user, req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const tasks = await service.getTasks(req.user);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const task = await service.getTaskById(req.params.id, req.user);
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await service.updateTask(req.params.id, req.user, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await service.deleteTask(req.params.id, req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};