const service = require('../services/users.service');

exports.create = async (req, res) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await service.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await service.getUserById(req.params.id, req.user);
    res.status(200).json(user);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await service.updateUser(req.params.id, req.user, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await service.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};