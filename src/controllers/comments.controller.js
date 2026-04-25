const service = require('../services/comments.service');

exports.create = async (req, res) => {
  try {
    const comment = await service.createComment(req.user, req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const comments = await service.getComments(req.user);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const comment = await service.getCommentById(req.params.id, req.user);
    res.status(200).json(comment);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await service.updateComment(req.params.id, req.user, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await service.deleteComment(req.params.id, req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 404).json({ message: err.message });
  }
};