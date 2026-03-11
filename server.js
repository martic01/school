import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Cloudinary config
cloudinary.config({
  cloud_name: 'dq46c3lf3',
  api_key: '767899835468131',
  api_secret: 'JeytQ7MopgskaUIDXYDdfR5Co_k'
});

// SQLite setup
const db = new sqlite3.Database('./boxes.db');

db.run(`CREATE TABLE IF NOT EXISTS boxes (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// GET all boxes
app.get('/api/boxes', (req, res) => {
  console.log('GET /api/boxes called');
  
  db.all('SELECT id, data FROM boxes ORDER BY created_at ASC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    
    try {
      const boxes = rows.map(r => ({
        ...JSON.parse(r.data),
        id: r.id
      }));
      
      console.log(`Returning ${boxes.length} boxes`);
      res.json(boxes);
    } catch (e) {
      console.error('Parse error:', e);
      res.status(500).json({ error: 'Failed to parse box data' });
    }
  });
});

// POST new box (this was missing!)
// POST new box
app.post('/api/boxes', (req, res) => {
  console.log('📥 POST /api/boxes received!'); // ADD THIS LINE for debugging
  const box = req.body;
  const id = box.id || Date.now().toString();
  const { id: _, ...boxData } = box;
  
  db.run('INSERT INTO boxes (id, data) VALUES (?, ?)', 
    [id, JSON.stringify(boxData)], 
    function(err) {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ ...boxData, id });
    }
  );
});

// PUT update box
app.put('/api/boxes/:id', (req, res) => {
  db.run('UPDATE boxes SET data = ? WHERE id = ?', 
    [JSON.stringify(req.body), req.params.id], 
    function(err) {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Box not found' });
      }
      res.json(req.body);
    }
  );
});

// DELETE box
app.delete('/api/boxes/:id', (req, res) => {
  console.log('Deleting ID:', req.params.id);
  
  db.run('DELETE FROM boxes WHERE id = ?', req.params.id, function(err) {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Box not found' });
    }
    res.json({ message: 'Box deleted', id: req.params.id });
  });
});

// Cloudinary image deletion (single, clean version)
app.post('/api/delete-cloudinary-image', async (req, res) => {
  const { publicId } = req.body;

  console.log('Received Cloudinary delete request for publicId:', publicId);

  if (!publicId) {
    console.error('No publicId provided');
    return res.status(400).json({ error: 'publicId is required' });
  }

  try {
    console.log(`Attempting to delete Cloudinary image: ${publicId}`);
    console.log('Cloudinary config:', {
      cloud_name: cloudinary.config().cloud_name,
      api_key_exists: !!cloudinary.config().api_key
    });
    
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary destroy result:', JSON.stringify(result, null, 2));
    
    if (result.result === 'ok') {
      console.log('✅ Cloudinary image deleted successfully');
      return res.json({ success: true, result: result.result });
    } else if (result.result === 'not found') {
      console.log('⚠️ Cloudinary image not found (already deleted?)');
      return res.json({ success: true, result: result.result });
    } else {
      console.error('❌ Cloudinary deletion failed with result:', result);
      return res.status(500).json({ error: 'Cloudinary deletion failed', result });
    }
  } catch (err) {
    console.error('❌ Cloudinary error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`   Cloudinary cloud: ${cloudinary.config().cloud_name}`);
});