const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const dbName = 'tasks.db';
const db = new sqlite3.Database(dbName);

const port = 4000;

let tasks = [
  { id: 1, text: 'Go to Tree' },
  { id: 2, text: 'Go to Vasa' },
  { id: 3, text: 'Go to Book' },
  { id: 4, text: 'Go to And' },
  { id: 5, text: 'Go to Winston' },
];

const serverError = (err, res) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
};

const checkExist = (task, res) => {
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    serverError(err, res);

    res.status(200).json(rows);
  });
});

app.post('/tasks', (req, res) => {
  // Get data from body
  const newTask = req.body;

  // tasks.push(newTask);
  db.run('INSERT INTO tasks (text) VALUES (?)', [newTask.text], (err) => {
    serverError(err, res);

    return res.status(201).json({ id: this.lastId });
  });
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  db.get('SELECT * FROM tasks WHERE id = ?', taskId, (err, row) => {
    serverError(err, res);
    checkExist(row, res);

    return res.status(200).json(row);
  });
});

app.put('/tasks/:id', (req, res) => {
  // Get data from body
  const { text } = req.body;
  const taskId = parseInt(req.params.id);

  db.run('UPDATE tasks SET text = ? WHERE id = ?', [text, taskId], (err) => {
    serverError(err, res);

    return res.status(200).json({ id: taskId, text });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  db.run('DELETE FROM tasks WHERE id = ?', taskId, (err) => {
    serverError(err, res);

    return res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
