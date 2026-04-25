const service = require('../services/projects.service');

exports.create = async (req, res) => {
  try {
    const project = await service.createProject(req.user, req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const projects = await service.getProjects(req.user);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const project = await service.getProjectById(req.params.id, req.user);
    res.status(200).json(project);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await service.updateProject(req.params.id, req.user, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await service.deleteProject(req.params.id, req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};