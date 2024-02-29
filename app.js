const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  tasks.push({ task, date: new Date().toLocaleString() });
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = req.body.index;
  tasks.splice(index, 1);
  res.redirect('/');
});


app.post('/edit', (req, res) => {
  const index = req.body.index;
  const editedTask = req.body.editedTask;
  tasks[index].task = editedTask;
  tasks[index].date = new Date().toLocaleString(); 
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
