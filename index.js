const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const dbName = 'tasks.db';
const db = new sqlite3.Database(dbName);

require('./config/db');
const port = 4000;
const Task = require('./models/taskModel');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json(tasks);
  } catch (error) {
    console.log('Task creation :>> ', error);
    return res.status(500).json({ error: e.message });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: err ?? 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.log('Task creation :>> ', error);
    return res.status(500).json({ eor: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  // Get data from body
  try {
    const newTask = req.body;

    const task = await Task.create({
      text: newTask.text,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not created' });
    }

    return res.status(201).json(task);
  } catch (error) {
    console.log('Task creation :>> ', error);
    return res.status(500).json({ eor: err.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  // Get data from body
  try {
    const { text, isCompleted } = req.body;
    const taskId = req.params.id;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { text, isCompleted },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: err ?? 'Task not found' });
    }

    return res.status(200).json({ id: taskId, text });
  } catch (error) {
    console.log('Task creation :>> ', error);
    return res.status(500).json({ eor: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: err ?? 'Task not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.log('Task creation :>> ', error);
    return res.status(500).json({ eor: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
