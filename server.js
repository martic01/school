// // server.js
// import express from 'express';
// import cors from 'cors';
// import sqlite3 from 'sqlite3';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { v2 as cloudinary } from 'cloudinary';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));

// // Cloudinary config
// cloudinary.config({
//   cloud_name: 'dq46c3lf3',
//   api_key: '317733934797888',
//   api_secret: 'ZiPo6xNCs4B2Cndsbcn3DPZVBs4'
// });

// // SQLite setup
// const db = new sqlite3.Database('./boxes.db');

// db.run(`CREATE TABLE IF NOT EXISTS boxes (
//   id TEXT PRIMARY KEY,
//   data TEXT NOT NULL,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// )`);

// // GET all boxes
// app.get('/api/boxes', (req, res) => {
//   db.all('SELECT data FROM boxes ORDER BY created_at ASC', (err, rows) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ error: err.message });
//     }
//     try {
//       const boxes = rows.map(r => JSON.parse(r.data));
//       res.json(boxes);
//     } catch (e) {
//       console.error('Parse error:', e);
//       res.status(500).json({ error: 'Failed to parse box data' });
//     }
//   });
// });

// // POST new box
// app.post('/api/boxes', (req, res) => {
//   const box = req.body;
//   const id = box.id || Date.now().toString();
//   const boxWithId = { ...box, id };
  
//   db.run('INSERT INTO boxes (id, data) VALUES (?, ?)', 
//     [id, JSON.stringify(boxWithId)], 
//     function(err) {
//       if (err) {
//         console.error('Insert error:', err);
//         return res.status(500).json({ error: err.message });
//       }
//       res.json(boxWithId);
//     }
//   );
// });

// // PUT update box
// app.put('/api/boxes/:id', (req, res) => {
//   db.run('UPDATE boxes SET data = ? WHERE id = ?', 
//     [JSON.stringify(req.body), req.params.id], 
//     function(err) {
//       if (err) {
//         console.error('Update error:', err);
//         return res.status(500).json({ error: err.message });
//       }
//       if (this.changes === 0) {
//         return res.status(404).json({ error: 'Box not found' });
//       }
//       res.json(req.body);
//     }
//   );
// });

// // DELETE box
// app.delete('/api/boxes/:id', (req, res) => {
//   db.run('DELETE FROM boxes WHERE id = ?', req.params.id, function(err) {
//     if (err) {
//       console.error('Delete error:', err);
//       return res.status(500).json({ error: err.message });
//     }
//     if (this.changes === 0) {
//       return res.status(404).json({ error: 'Box not found' });
//     }
//     res.json({ message: 'Box deleted', id: req.params.id });
//   });
// });

// // Cloudinary image deletion
// app.post('/api/delete-cloudinary-image', async (req, res) => {
//   const { publicId } = req.body;

//   if (!publicId) {
//     return res.status(400).json({ error: 'publicId is required' });
//   }

//   try {
//     console.log(`Deleting Cloudinary image: ${publicId}`);
//     const result = await cloudinary.uploader.destroy(publicId);
//     console.log('Cloudinary result:', result);
    
//     if (result.result === 'ok' || result.result === 'not found') {
//       return res.json({ success: true, result: result.result });
//     }

//     return res.status(500).json({ error: 'Cloudinary deletion failed', result });
//   } catch (err) {
//     console.error('Cloudinary error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start server
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
//   console.log(`   Cloudinary cloud: ${cloudinary.config().cloud_name}`);
// });