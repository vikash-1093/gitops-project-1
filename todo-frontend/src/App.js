import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/tasks`).then(res => setTasks(res.data));
  }, [API_URL]);

  const addTask = async () => {
    if (!title) return;
    const res = await axios.post(`${API_URL}/tasks`, { title });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`${API_URL}/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !completed } : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>✅ TODO App</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id, task.completed)}
              style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
