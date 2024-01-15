import bcrypt from 'bcrypt';
import User from '../models/userModels.js';

export default async (req, res, next) => {
  //check for basic auth header
  try {
    if (!req.user) {
      return res.status(404).send({ message: 'User Not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(500).json({ message: 'No permission' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
