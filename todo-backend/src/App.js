const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'todo_user',
  password: process.env.DB_PASSWORD || 'todo_pass',
  database: process.env.DB_NAME || 'todo_db',
  port: 5432,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`);

app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
  res.json(result.rows);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.json(result.rows[0]);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await pool.query('UPDATE tasks SET completed=$1 WHERE id=$2', [completed, id]);
  res.sendStatus(200);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`✅ Backend running on port ${port}`));
