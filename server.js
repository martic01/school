// server.js (ESM)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // you already have this in dependencies

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev origin
  })
);
app.use(express.json());

// Test route: http://localhost:3000/ping
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/api/deepseek', async (req, res) => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('DeepSeek error:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});