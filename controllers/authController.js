import bcrypt from 'bcrypt';
import User from '../models/userModels.js';

export const register = async (req, res) => {
  try {
    const { userName, email, role, password: pass } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);

    const user = await User.create({
      userName,
      email,
      role,
      password: hash,
    });

    const { password, ...userData } = user._doc;

    return res.status(201).json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password: pass } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Not found' });
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      return res.status(404).json({ message: 'Invalid password or email' });
    }

    const { password, ...userData } = user._doc;

    return res.status(201).json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
