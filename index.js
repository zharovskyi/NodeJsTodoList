const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 4000;

let tasks = [
  { id: 1, text: 'Go to Tree' },
  { id: 2, text: 'Go to Vasa' },
  { id: 3, text: 'Go to Book' },
  { id: 4, text: 'Go to And' },
  { id: 5, text: 'Go to Winston' },
];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  
  const taskId = parseInt(req.params.id);

  const foundTask = tasks.find((task) => task.id === taskId);

  if (!foundTask) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json(foundTask);
});

app.post('/tasks', (req, res) => {
  // Get data from body
  const newTask = req.body;

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  // Get data from body
  const updatedTask = req.body;
  const taskId = parseInt(req.params.id);

  const foundTask = tasks.find((task) => task.id === taskId);

  if (!foundTask) {
    return res.status(404).json({ message: 'Task not found' });
  }

  foundTask.text = updatedTask.text;

  return res.status(200).json(foundTask);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.filter((t) => t.id !== taskId);

  return res.status(204).json(tasks);
});

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
