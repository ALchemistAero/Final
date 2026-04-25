const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRepo = require('../repositories/users.repository');

exports.signup = async (data) => {
  const existing = await usersRepo.findByEmail(data.email);
  if (existing) {
    throw { status: 409, message: 'Email already exists' };
  }

  const hash = await bcrypt.hash(data.password, 10);

  return await usersRepo.create({
    name: data.name,
    email: data.email,
    password_hash: hash,
    role: 'user'
  });
};

exports.login = async (email, password) => {
  const user = await usersRepo.findByEmail(email);

  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  return token;
};