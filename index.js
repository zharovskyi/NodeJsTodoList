const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
const checkAuth = require('./middlware/checkAuth');
const checkAdmin = require('./middlware/checkAdmin');

const port = 4000;

require('./config/db');

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, role, password: pass } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hash,
    });

    const { password, ...userData } = user._doc;

    return res.status(201).json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
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
});

app.get('/test', checkAuth, checkAdmin, async (req, res) => {
  return res.send('Test Works');
});

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
