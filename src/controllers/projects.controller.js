import * as service from '../services/projects.service.js';

export const create = async (req, res) => {
  try {
    const project = await service.createProject(req.user, req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const projects = await service.getProjects(req.user);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const project = await service.getProjectById(req.params.id, req.user);
    res.status(200).json(project);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await service.updateProject(req.params.id, req.user, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await service.deleteProject(req.params.id, req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};
