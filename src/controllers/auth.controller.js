const service = require('../services/auth.service');

exports.signup = async (req, res) => {
  try {
    const user = await service.signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await service.login(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(err.status || 401).json({ message: err.message });
  }
};