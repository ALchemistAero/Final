import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepo from '../repositories/users.repository.js';

export const signup = async (data) => {
  const existing = await usersRepo.findByEmail(data.email);

  if (existing) {
    throw { status: 409, message: 'Email already exists' };
  }

  const hash = await bcrypt.hash(data.password, 10);

  return await usersRepo.create({
    name: data.name,
    email: data.email,
    password_hash: hash,
    role: data.role || 'user',
  });
};

export const login = async (email, password) => {
  const user = await usersRepo.findByEmail(email);

  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};
